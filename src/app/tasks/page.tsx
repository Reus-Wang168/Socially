"use client"
async function TaskPage() {

    const response = await fetch ('http://localhost:3000/api/tasks')
    const data = await response.json()

    console.log(data)


  return (
    <div>
      TaskPage
    </div>
  )
}

export default TaskPage
