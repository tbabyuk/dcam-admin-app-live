import { NextResponse } from "next/server";
import { supabase } from "@/database/supabase-config";

/** Only present/counted rows earn pay (matches AttendanceModal display logic). */
const statusEarnsPay = (status) => status === "present" || status === "counted";



export const POST = async (req) => {

    const { user, payday: requestedPayday } = await req.json()

    console.log("Logging user from API:", user)
    
    try {
        // Fetch distinct paydays (ordered desc) for dropdown
        const { data: paydayRows, error: paydayError } = await supabase
            .from('portal_attendance')
            .select('payday')
            .not('payday', 'is', null)
            .order('payday', { ascending: false })

        if (paydayError) {
            console.log("Supabase payday error:", paydayError)
            return NextResponse.json({ error: paydayError.message }, { status: 500 })
        }

        const paydays = [...new Set((paydayRows || []).map(r => r.payday).filter(Boolean))]
        const mostRecentPayday = paydays[0] ?? null

        const selectedPayday = requestedPayday && paydays.includes(requestedPayday)
            ? requestedPayday
            : mostRecentPayday

        if (!selectedPayday) {
            return NextResponse.json({ metaArray: [], paydays: [], currentPayday: null })
        }

        let query = supabase
            .from('portal_attendance')
            .select('teacher_name, teacher_id, week_1_status, week_2_status, payday, week_1_notes, week_2_notes, student_name, week_1_pay, week_2_pay')
            .eq('payday', selectedPayday)

        // For demo user, only fetch demo teachers
        if (user === "Demo") {
            console.log("If block fired++++++++++++++++++++=")
            query = query.in('teacher_name', ['demo1', 'demo2', 'demo3'])
        } else {
            // Exclude demo teachers for regular users
            query = query.not('teacher_name', 'in', '(demo1,demo2,demo3,demo4,demo5)')
        }

        const { data, error } = await query

        if (error) {
            console.log("Supabase error:", error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        // Aggregate data by teacher
        const teacherMap = new Map()

        data.forEach(record => {
            const teacherName = record.teacher_name

            if (!teacherMap.has(teacherName)) {
                teacherMap.set(teacherName, {
                    teacher: teacherName,
                    payday: record.payday,
                    students: [],
                    week1Notes: null,
                    week2Notes: null,
                    week1Pay: 0,
                    week2Pay: 0
                })
            }

            const teacherData = teacherMap.get(teacherName)
            
            // Add student record
            teacherData.students.push({
                name: record.student_name,
                week1Status: record.week_1_status,
                week2Status: record.week_2_status
            })

            // Sum pay only when that week earned pay (same rule as AttendanceModal)
            if (statusEarnsPay(record.week_1_status)) {
                teacherData.week1Pay += Number(record.week_1_pay) || 0
            }
            if (statusEarnsPay(record.week_2_status)) {
                teacherData.week2Pay += Number(record.week_2_pay) || 0
            }

            // Capture notes (they should be the same for all students of a teacher, but just in case take the first non-null)
            if (!teacherData.week1Notes && record.week_1_notes) {
                teacherData.week1Notes = record.week_1_notes
            }
            if (!teacherData.week2Notes && record.week_2_notes) {
                teacherData.week2Notes = record.week_2_notes
            }
        })

        // Transform to metaArray format expected by frontend
        const metaArray = Array.from(teacherMap.values()).map(teacherData => {
            // Check if all students have submitted for week 2 (status is not 'unrecorded')
            const week2Submitted = teacherData.students.length > 0 && 
                teacherData.students.every(s => s.week2Status && s.week2Status !== 'unrecorded')
            
            // Check if all students have submitted for week 1
            const week1Submitted = teacherData.students.length > 0 && 
                teacherData.students.every(s => s.week1Status && s.week1Status !== 'unrecorded')

            const week1Pay = teacherData.week1Pay
            const week2Pay = teacherData.week2Pay
            const totalPay = week1Pay + week2Pay

            return {
                teacher: teacherData.teacher,
                week1Submitted,
                week2Submitted,
                payday: teacherData.payday,
                week1Notes: teacherData.week1Notes,
                week2Notes: teacherData.week2Notes,
                week1Pay,
                week2Pay,
                totalPay
            }
        })

        // Sort by teacher name for consistent ordering
        metaArray.sort((a, b) => a.teacher.localeCompare(b.teacher))

        return NextResponse.json({ metaArray, paydays, currentPayday: selectedPayday })

    } catch (error) {
        console.log("Error getting data from db:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
