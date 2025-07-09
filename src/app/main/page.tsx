import { StudentsListWidget } from "./_components/StudentsListWidget";

export default function MainPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-indigo-100 p-10">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 w-full h-full ">
                <StudentsListWidget />
            </div>
        </div>
    );
}