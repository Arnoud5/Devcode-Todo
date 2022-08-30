import React, { useEffect, useState } from "react";
import deleteIcon from "../Commons/Assets/delete.png";
import emptyState from "../Commons/Assets/activity.png"
import deleteModalPicture from "../Commons/Assets/modal-delete-icon.png"
import { useNavigate } from "react-router-dom";

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState(false);
    const [idSelected, setIdSelected] = useState();

    const openDeleteModal = (id) => {
        const popup = document.querySelector(".popup-modal-delete");
        deleteModal === true ? setDeleteModal(false) : setDeleteModal(true);
        deleteModal ? (popup.style.display = "none") : (popup.style.display = "block")
        setIdSelected(id)
    }

    const handleAddActivity = async () => {
        const response = await fetch("https://todo.api.devcode.gethired.id/activity-groups", {
            method: 'POST',
            body: JSON.stringify({
                "title": "New Activity",
                "email": "rey.sarayar@gmail.com"
            }),
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json"
            }
        })
        fetchActivity();
    }

    const fetchActivity = async () => {
        const response = await fetch("https://todo.api.devcode.gethired.id/activity-groups?email=rey.sarayar@gmail.com", {
            method: 'GET',
            redirect: 'follow'
        })
        const result = await response.json();
        const data = await result.data;
        setActivities(data)
    }
    const handleDelete = async () => {
        const response = await fetch(`https://todo.api.devcode.gethired.id/activity-groups/${idSelected}?email=rey.sarayar@gmail.com`, {
            method: 'DELETE',
            body: "",
            redirect: 'follow'
        })
        const result = await response.json();
        console.log(result)
        fetchActivity();
        openDeleteModal(idSelected)
    }

    const emptyData = (
        <div data-cy="activity-empty-state" className="flex justify-center items-center h-[calc(100vh-200px)]">
            <img className="w-1/2" src={emptyState} alt="Empty activity placeholder" />
        </div>
    )

    useEffect(() => {
        fetchActivity();
    }, []);

    // console.log(Activities)

    return (
        <div className="relative">
            <div style={{ display: "none" }}
                onClick={handleDelete}
                className="z-10 fixed top-0 bottom-0 left-0 right-0 h-screen popup-modal-delete bg-black bg-opacity-60 "
            >
                <div className="fixed max-w-[500px] mx-auto bg-white shadow-sm top-1/4 left-0 right-0 text-center rounded-[12px]">
                    <img className="flex mx-auto mt-[50px]" src={deleteModalPicture} alt="delete icon" />
                    <p className="my-[50px] font-medium text-lg">Apakah anda yakin menghapus activity<br /><b>"Meeting dengan client"?</b></p>
                    <div className="flex justify-center mb-[50px]">
                        <button className="mr-4 bg-[#F4F4F4] font-semibold text-lg text-[#4A4A4A] px-[51px] py-[13px] rounded-[45px]">Batal</button>
                        <button onClick={handleDelete} className="bg-[#ED4C5C] font-semibold text-lg text-white px-[51px] py-[13px] rounded-[45px]">Hapus</button>
                    </div>
                </div>
            </div>
            <section className="w-11/12 md:max-w-xl xl:max-w-5xl mx-auto relative">
                <div className="flex justify-between mt-12">
                    <h2 data-cy="activity-title" className="font-bold text-xl md:text-4xl">Activity</h2>
                    <button data-cy="activity-add-button" onClick={handleAddActivity} className="bg-[#16ABF8] rounded-full p-3 text-white font-semibold focus:ring focus:ring-sky-300">+ Tambah</button>
                </div>
                {
                    activities.length >= 1 ?
                        (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 mt-4">
                                {
                                    activities?.map((res, i) => (

                                        <div key={i} data-cy={"activity-item-" + (i + 1)} className="bg-white shadow-lg max-w-[235px] h-[235px] rounded-xl">
                                            <div className="p-5 h-full flex flex-col justify-between">
                                                <p onClick={() => navigate(`/detail/${res.id}`)} data-cy="activity-item-title" className="text-left font-bold text-lg">{res.title}</p>
                                                <div className="flex justify-between">
                                                    <p data-cy="activity-item-date" className="text-[#888888] font-medium text-sm">
                                                        {
                                                            res.created_at
                                                        }
                                                    </p>
                                                    <div onClick={() => openDeleteModal(res.id)}>
                                                        <img data-cy="activity-item-delete-button" src={deleteIcon} alt="delete button" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : emptyData
                }
                {/* boxes */}
            </section>

        </div>
    )
}

export default Activity;