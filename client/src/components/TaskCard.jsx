import {Card, CardFooter, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid"
import {Button} from "@/components/ui/button"

export default function TaskCard({task, OnToggle, OnDelete}){

    return(
        <Card className={`relative animation-fade ${task.completed? "opacity-70":""}`}>
            <CardHeader>
                <CardTitle
                className={`text-lg font-semibold ${task.completed? "line-through text-zinc-400":""}`}>
                    {task.title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-sm dark:text-zinc-300">{task.description}</p>
            </CardContent>

            <CardFooter>
                <Button size="icon" variant={task.completed? "Outline":"Secondary"} onClick={()=>OnToggle(task._id)}>
                    <CheckCircleIcon className="h-5 w-5"/>
                </Button>
                <Button size="icon" variant="destructive" onClick ={()=>OnDelete(task._id)}>
                    <TrashIcon className="h-5 w-5"/>
                </Button>
            </CardFooter>

        </Card>
    )

}