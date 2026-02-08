import { NextResponse } from "next/server"
import { supabase } from "@/database/supabase-config"



export const POST = async (req) => {

    const {currentTeacher, currentWeek} = await req.json()

    console.log("logging current teacher and current week:", currentTeacher, currentWeek)

    try {
        // Get notes for the specified teacher
        // Notes are stored per student record, but should be the same for all students of a teacher
        // We'll get the first non-null notes entry
        const { data, error } = await supabase
            .from('portal_attendance')
            .select('week_1_notes, week_2_notes')
            .eq('teacher_name', currentTeacher)
            .limit(1)

        if (error) {
            console.log("Supabase error:", error)
            return NextResponse.json({ message: error.message }, { status: 500 })
        }

        // Transform to the format expected by NotesModal
        // Original format: [{ week1Notes, week2Notes }]
        const teacherNotes = data.length > 0 ? [{
            week1Notes: data[0].week_1_notes,
            week2Notes: data[0].week_2_notes
        }] : [{ week1Notes: null, week2Notes: null }]

        console.log("logging teacherNotes from API:", teacherNotes)

        return NextResponse.json({teacherNotes})

    } catch (error) {
        
        return NextResponse.json({message: error.message})
    }

}
