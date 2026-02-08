import { NextResponse } from "next/server"
import { supabase } from "@/database/supabase-config"



export const POST = async (req) => {

    const {currentTeacher} = await req.json()

    try {
        const { data, error } = await supabase
            .from('portal_attendance')
            .select('student_name, week_1_status, week_2_status')
            .eq('teacher_name', currentTeacher)

        if (error) {
            console.log("Supabase error:", error)
            return NextResponse.json({ message: error.message }, { status: 500 })
        }

        // Transform to the format expected by AttendanceModal
        // Original format: { name, attendance: { week1, week2 }, pay }
        const teacherAttendanceArray = data.map(record => ({
            name: record.student_name,
            attendance: {
                week1: record.week_1_status,
                week2: record.week_2_status
            },
            // Note: pay is not available in portal_attendance table
            // If pay is needed, it would require joining with enrollments or another table
            pay: 0
        }))

        return NextResponse.json({teacherAttendanceArray})

    } catch (error) {
        
        return NextResponse.json({message: error.message})
    }

}
