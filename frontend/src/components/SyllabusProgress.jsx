import { useState } from "react";

function SyllabusProgress() {

   

    const initialData = [

    {
        id: 1,
        name: "Mathematics",
        chapters: [

            {
                id: 1,
                name: "Chapter 1",
                tasks: [

                    {
                        id: 1,
                        name: "Task 1",
                        status: "Not Started"
                    },
                    {
                        id: 2,
                        name: "Task 2",
                        status: "Not Started"
                    }

                ]
            },

            {
                id: 2,
                name: "Chapter 2",
                tasks: [

                    {
                        id: 3,
                        name: "Task 3",
                        status: "Not Started"
                    },
                    {
                        id: 4,
                        name: "Task 4",
                        status: "Not Started"
                    }

                ]
            }

        ]
    }

];

const [subjects, setSubjects] = useState(() => {

    const saved =
        localStorage.getItem("syllabus");

    return saved
        ? JSON.parse(saved)
        : initialData;

});


    const changeStatus = (
        subjectId,
        chapterId,
        taskId
    ) => {

        const updated = subjects.map(subject => {

            if (subject.id === subjectId) {

                return {

                    ...subject,

                    chapters: subject.chapters.map(chapter => {

                        if (chapter.id === chapterId) {

                            return {

                                ...chapter,

                                tasks: chapter.tasks.map(task => {

                                    if (task.id === taskId) {

                                        if (
                                            task.status === "Not Started"
                                        ) {

                                            return {
                                                ...task,
                                                status: "In Progress"
                                            };

                                        }

                                        if (
                                            task.status === "In Progress"
                                        ) {

                                            return {
                                                ...task,
                                                status: "Done"
                                            };

                                        }

                                        return task;

                                    }

                                    return task;

                                })

                            };

                        }

                        return chapter;

                    })

                };

            }

            return subject;

        });

        setSubjects(updated);

        localStorage.setItem(
            "syllabus",
            JSON.stringify(updated)
        );

    };


    const chapterProgress = (chapter) => {

        const completed =
            chapter.tasks.filter(
                task => task.status === "Done"
            ).length;

        return (
            (
                completed /
                chapter.tasks.length
            ) * 100
        );

    };


    const subjectProgress = (subject) => {

        let total = 0;

        subject.chapters.forEach(chapter => {

            total += chapterProgress(chapter);

        });

        return (
            total /
            subject.chapters.length
        );

    };


    return (

        <div>

            <h1>Syllabus Progress</h1>

            {

                subjects.map(subject => (

                    <div key={subject.id}>

                        <h2>
                            {subject.name}
                        </h2>

                        <h3>

                            Subject Progress :

                            {

                                subjectProgress(
                                    subject
                                ).toFixed(0)

                            }

                            %

                        </h3>

                        {

                            subject.chapters.map(chapter => (

                                <div
                                    key={chapter.id}
                                    style={{
                                        marginLeft: "20px"
                                    }}
                                >

                                    <h4>

                                        {chapter.name}

                                    </h4>

                                    <p>

                                        Chapter Progress :

                                        {

                                            chapterProgress(
                                                chapter
                                            ).toFixed(0)

                                        }

                                        %

                                    </p>

                                    {

                                        chapter.tasks.map(task => (

                                            <div
                                                key={task.id}
                                            >

                                                <button

                                                    onClick={() =>
                                                        changeStatus(
                                                            subject.id,
                                                            chapter.id,
                                                            task.id
                                                        )
                                                    }

                                                >

                                                    {

                                                        task.name

                                                    }

                                                </button>

                                                {" "}

                                                {

                                                    task.status

                                                }

                                            </div>

                                        ))

                                    }

                                    <br />

                                </div>

                            ))

                        }

                    </div>

                ))

            }

        </div>

    );

}

export default SyllabusProgress;