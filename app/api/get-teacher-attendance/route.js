import { NextResponse } from "next/server"
import { supabase } from "@/database/supabase-config"



export const POST = async (req) => {

    const {currentTeacher} = await req.json()

    try {
        const { data, error } = await supabase
            .from('portal_attendance')
            .select('student_name, week_1_status, week_2_status, week_1_pay, week_2_pay')
            .eq('teacher_name', currentTeacher)

        if (error) {
            console.log("Supabase error:", error)
            return NextResponse.json({ message: error.message }, { status: 500 })
        }

        // Transform to the format expected by AttendanceModal
        const teacherAttendanceArray = data.map(record => ({
            name: record.student_name,
            attendance: {
                week1: record.week_1_status,
                week2: record.week_2_status
            },
            week1Pay: Number(record.week_1_pay) ?? 0,
            week2Pay: Number(record.week_2_pay) ?? 0
        }))

        return NextResponse.json({teacherAttendanceArray})

    } catch (error) {
        
        return NextResponse.json({message: error.message})
    }

}
