import axios from "axios";
import { useEffect, useState } from "react";

const fetchTask = async() => {
    const res = await axios.get(
        'http://localhost:3000/task'
    );
    return res
};


const createTask = async(data:any) => {
    const res = await axios.post(
        'http://localhost:3000/task', data
    );
    return res
};

const deleteTask = async(id : any) => {
    const res = await axios.delete(
        `http://localhost:3000/task/${id}`,
    );
    return res
};


const updateTask = async(data:any , id : any) => {
    const res = await axios.patch(
        `http://localhost:3000/task/${id}`,data
    );
    return res
}

export default function TaskPage(){
    const [tasks, setTasks] = useState<any>()
    const [taskName, setTaskName] = useState("")


    useEffect(() => {
        fetchTask().then((task) => setTasks(task.data))  
    }, [])

    const handleCreateTask =() =>{
        createTask({taskName: taskName, taskStatus: false})
    }

    const handleDeleteTask =(id : any) =>{
        deleteTask(id)
    }

    const handleUpdateTask =(data:any, id:any) =>{
        updateTask(data,id)
    }

    return (
        <div>Task App in NestJs and NextJs
            {
                tasks && tasks.map((task:any) =>{
                   return  <div key={task}>
                    <h1>{task.taskName}</h1>
                    <h1>{task.taskStatus.toString()}</h1>
                    
                    <button onClick={ ()=> handleDeleteTask(task.id)} className="px-4 py-2 bg-rose-400">Delete task</button>
                <button onClick={()=>handleUpdateTask({taskName : task.taskName , taskStatus : !task.taskStatus} , task.id)} className="px-4 py-2 bg-yellow-400">Handle update</button>
                   </div>
                })
            }
            <input value = {taskName} onChange={(e) => setTaskName(e.target.value)} /> 
            <button onClick={handleCreateTask}className="px-4 py-2 bg-green-400">Create task</button>
         
        </div>
    )
}

