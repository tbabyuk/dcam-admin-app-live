

export const WeeklyTodosSection = () => {


    return (

        <div className="w-full mb-6 flex gap-x-[1.8px] rounded-sm overflow-x-auto">
            <div className="weekly-todos-day">
                <h5 className="py-2 text-center bg-gray-300 text-gray-600 font-semibold">Monday</h5>
                <ul className="list-inside list-disc p-3 text-[0.8rem] space-y-2">
                    <li>do billing for all PAYG lessons for the week</li>
                    <li>assign a photo day for each teacher for the week ahead</li>
                    <li>wash the floors</li>
                </ul>
            </div>
            <div className="weekly-todos-day">
                <h5 className="py-2 text-center bg-gray-300 text-gray-600 font-semibold">Tuesday</h5>
                <ul className="list-inside list-disc p-3 text-[0.8rem] space-y-2">
                    <li>follow up on any trial lessons we had last week</li>
                </ul>
            </div>
            <div className="weekly-todos-day">
                <h5 className="py-2 text-center bg-gray-300 text-gray-600 font-semibold">Wednesday</h5>
                <ul className="list-inside p-3 text-[0.8rem] space-y-2">
                    <li>n/a</li>
                </ul>
            </div>
            <div className="weekly-todos-day">
                <h5 className="py-2 text-center bg-gray-300 text-gray-600 font-semibold">Thursday</h5>
                <ul className="list-inside list-disc p-3 text-[0.8rem] space-y-2">
                    <li>schedule all trial lesson reminders for next week</li>
                    <li>look over all overdue invoices from the week and make sure they are all paid (if not send reminders)</li>
                </ul>
            </div>
            <div className="weekly-todos-day">
                <h5 className="py-2 text-center bg-gray-300 text-gray-600 font-semibold">Friday</h5>
                <ul className="list-inside p-3 text-[0.8rem] space-y-2">
                    <li>n/a</li>
                </ul>
            </div>
            <div className="weekly-todos-day">
                <h5 className="py-2 text-center bg-gray-300 text-gray-600 font-semibold">Saturday</h5>
                <ul className="list-inside p-3 text-[0.8rem] space-y-2">
                    <li>n/a</li>
                </ul>
            </div>
            <div className="weekly-todos-day">
                <h5 className="py-2 text-center bg-gray-300 text-gray-600 font-semibold">Sunday</h5>
                <ul className="list-inside p-3 text-[0.8rem] space-y-2">
                    <li>n/a</li>
                </ul>
            </div>
        </div>
    )

}