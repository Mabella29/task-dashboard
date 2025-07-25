import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskDialog from "../components/TaskDialog";
import NavBar from "../components/NavBar";
import { toast } from "sonner";


export default function DashBoard(){
    const [tasks, setTasks] = useState([]);

    const load = async ()=>{
        const res = await API.get("/tasks/me");
        setTasks(res.data);
    }

useEffect(()=>{ load(); }, [])

const createTasks = async (payload)=>{
    const res = await API.post("/tasks", payload);
    setTasks(prev => [res.data, ...prev]);
    toast({title: "Task Created"})
};

const toggleTask = async(id)=>{
    const task = tasks.find(t=> t._id === id)
    const res = await API.put(`/tasks/${id}`, {completed: !task.completed});
    setTasks(prev => prev.map(t=> (t._id === id? res.data : t)));
};


const deleteTask = async(id)=>{
    await API.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
    toast({title: "Task deleted"})
};

return(
    <>
    <NavBar/>
    <main className="max-w-5xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Tasks</h1>
            <TaskDialog onSubmit={createTasks}/>
        </div>

        <section
        className="grid gap-6
                   sm:grid-cols-2
                   lg:grid-cols-3
                   xl:grid-cols-4"
        >
            {tasks.map(t =>(
                <TaskCard 
                key={t._id}
                task={t}
                OnToggle={toggleTask}
                OnDelete={deleteTask}
                />
            ))}

        </section>
    </main>
    </>

)
}