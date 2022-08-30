import React, { useState } from "react";
import Navbar from "../Commons/Navbar";
import EmptyTodoImage from "../Commons/Assets/todo-empty-state.png"
import BackIcon from "../Commons/Assets/todo-back-button.png"
import EditButton from "../Commons/Assets/todo-title-edit-button.png"
import SortTodo from "../Commons/Assets/todo-sort-button.png"
import Delete from "../Commons/Assets/delete.png"
import SortLatest from "../Commons/Assets/sort-latest.png"
import SortOldest from "../Commons/Assets/sort-oldest.png"
import SortAZ from "../Commons/Assets/sort-az.png"
import SortZA from "../Commons/Assets/sort-za.png"
import SortUnfinished from "../Commons/Assets/sort-unfinished.png"
import SortSelected from "../Commons/Assets/sort-selected.png"
import ModalCloseButton from "../Commons/Assets/modal-add-close-button.png"
import Dropdown from "../Commons/Assets/dropdown.png"
import deleteModalPicture from "../Commons/Assets/modal-delete-icon.png"
import { Link, useNavigate, useParams } from "react-router-dom";

const ItemListPage = () => {
    const { idActivity } = useParams();
    const navigate = useNavigate;
    const [sortOption, setSortOption] = useState(true);
    const [todoList, setTodoList] = useState([])
    const [openTodo, setOpenTodo] = useState(true)
    const [openPriorityDropodown, setOpenPriorityDropodown] = useState(true)
    const [newTitle, setNewTitle] = useState("")
    const [prioritySelected, setPrioritySelected] = useState('very-high')

    const [deleteModal, setDeleteModal] = useState(true);
    const [idSelected, setIdSelected] = useState();

    const openDeleteModal = () => {
        deleteModal === false ? setDeleteModal(true) : setDeleteModal(false);
        const popup = document.querySelector(".popup-modal-delete");
        deleteModal ? (popup.style.display = "block") : (popup.style.display = "none");
    }

    const handleAddTodo = () => {
        openTodo === true ? setOpenTodo(false) : setOpenTodo(true);
        const todo = document.querySelector(".todo-parent");
        openTodo ? (todo.style.display = "block") : (todo.style.display = "none")
    }

    const handlePriorityDropdown = () => {
        openPriorityDropodown === true ? setOpenPriorityDropodown(false) : setOpenPriorityDropodown(true);
        const priority = document.querySelector(".priority-dropdown");
        openPriorityDropodown ? (priority.style.display = "block") : (priority.style.display = "none")
    }

    const handleSort = () => {
        sortOption === true ? setSortOption(false) : setSortOption(true);
        const sort = document.querySelector(".sort-parent");
        sortOption ? (sort.style.display = "block") : (sort.style.display = "none")
    }

    const handleDelete = async () => {
        const response = await fetch(`https://todo.api.devcode.gethired.id/todo-items/${idSelected}`, {
            method: 'DELETE',
            body: "",
            redirect: 'follow'
        })
        fetchTodo();
        openDeleteModal();
    }

    const changeActiveStatus = async (active, id) => {
        let newActive;
        active === 1 || active === true ? newActive = false : newActive = true;
        console.log(active, id)
        fetch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "is_active": newActive
            }),
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res=>console.log(res));
        fetchTodo();
    }

    const emptyName = () => {
        setNewTitle("")
        document.querySelector(".modal-name").innerHTML = "";
    }

    const addTodo = async () => {
        const response = await fetch("https://todo.api.devcode.gethired.id/todo-items", {
            method: 'POST',
            body: JSON.stringify({
                "activity_group_id": idActivity,
                "title": newTitle,
                "priority": prioritySelected,
            }),
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json"
            }
        })
        fetchTodo();
    }

    const fetchTodo = async () => {
        const response = await fetch(`https://todo.api.devcode.gethired.id/activity-groups/${idActivity}?email=rey.sarayar@gmail.com`, {
            method: 'GET',
            redirect: 'follow'
        })
        const result = await response.json()
        const data = await result.todo_items
        setTodoList(data)
    }

    const EmptyTodoList = (
        <section className="w-11/12 md:max-w-xl xl:max-w-5xl mx-auto">
            <div data-cy="todo-empty-state" className="flex justify-center items-center h-[calc(100vh-200px)]">
                <img className="w-1/2" src={EmptyTodoImage} alt="Empty activity placeholder" />
            </div>
        </section>
    )

    const priority = (res) => {
        switch (res) {
            case 'very-high':
                return <div data-cy="todo-item-priority-indicator" style={{ backgroundColor: "#ED4C5C" }} className="w-2 h-2 rounded-full mx-4"></div>
                break;
            case 'high':
                return <div data-cy="todo-item-priority-indicator" style={{ backgroundColor: "#F8A541" }} className="w-2 h-2 rounded-full mx-4"></div>
                break;
            case 'medium':
                return <div data-cy="todo-item-priority-indicator" style={{ backgroundColor: "#00A790" }} className="w-2 h-2 rounded-full mx-4"></div>
                break;
            case 'low':
                return <div data-cy="todo-item-priority-indicator" style={{ backgroundColor: "#428BC1" }} className="w-2 h-2 rounded-full mx-4"></div>
                break;
            case 'very-low':
                return <div data-cy="todo-item-priority-indicator" style={{ backgroundColor: "#8942C1" }} className="w-2 h-2 rounded-full mx-4"></div>
                break;
            default:
                return <div></div>
        }
    }

    const priorityName = (res) => {
        switch (res) {
            case 'very-high':
                return "Very High"
                break;
            case 'high':
                return "High"
                break;
            case 'medium':
                return "Medium"
                break;
            case 'low':
                return "Low"
                break;
            case 'very-low':
                return "Very Low"
                break;
            default:
                return <div></div>
        }
    }
    useState(() => {
        fetchTodo();
    }, [])

    return (
        <div className="relative">
            <div style={{ display: "none" }}
                className="z-10 fixed top-0 bottom-0 left-0 right-0 h-screen popup-modal-delete bg-black bg-opacity-60 "
            >
                <div className="fixed max-w-[500px] mx-auto bg-white shadow-sm top-1/4 left-0 right-0 text-center rounded-[12px]">
                    <img className="flex mx-auto mt-[50px]" src={deleteModalPicture} alt="delete icon" />
                    <p className="my-[50px] font-medium text-lg">Apakah anda yakin menghapus activity<br /><b>"Meeting dengan client"?</b></p>
                    <div className="flex justify-center mb-[50px]">
                        <button onClick={openDeleteModal} className="mr-4 bg-[#F4F4F4] font-semibold text-lg text-[#4A4A4A] px-[51px] py-[13px] rounded-[45px]">Batal</button>
                        <button onClick={handleDelete} className="bg-[#ED4C5C] font-semibold text-lg text-white px-[51px] py-[13px] rounded-[45px]">Hapus</button>
                    </div>
                </div>
            </div>
            <Navbar />
            <div style={{ display: "none" }}
                className="todo-parent z-10 fixed top-0 bottom-0 left-0 right-0 h-screen popup-modal-delete bg-black bg-opacity-60 "
            >
                <div data-cy="modal-add" className="fixed max-w-[800px] mx-auto bg-white shadow-sm top-1/4 left-0 right-0 text-center rounded-[12px]">
                    <div className="flex justify-between p-[24px] border-b">
                        <p data-cy="modal-add-title" className="font-medium text-lg">Tambah List Item</p>
                        <img onClick={handleAddTodo} data-cy="modal-add-close-button" src={ModalCloseButton} alt="add modal close button" />
                    </div>
                    <div className="flex flex-col w-full items-start p-[30px]">
                        <label data-cy="modal-add-name-title" className="font-semibold text-xs" htmlFor="nama">NAMA LIST ITEM</label>
                        <input data-cy="modal-add-name-input" onChange={(e) => setNewTitle(e.target.value)} className="modal-name my-[9px] py-[14px] px-[18px] border w-full rounded-[6px] text-base font-normal text-[#A4A4A4]" name="nama" type="text" placeholder="Tambahkan nama list item" />

                        <label data-cy="modal-add-priority-input" className="font-semibold text-xs" htmlFor="priority">PRIORITY</label>
                        <div data-cy="modal-add-priority-dropdown" className="p-[14px] border rounded-[6px] flex items-center relative">
                            <div className="flex items-center">
                                {priority(prioritySelected)}
                                {priorityName(prioritySelected)}
                            </div>
                            <img className="ml-[40px] p-[4px]" onClick={handlePriorityDropdown} src={Dropdown} alt="dropdown icon" />
                            <div className="left-0 top-[50px] absolute priority-dropdown bg-white w-full shadow-lg" style={{ display: "none" }}>
                                <div data-cy="modal-add-priority-very-high" className="flex items-center p-[14px]" onClick={() => { setPrioritySelected('very-high'); handlePriorityDropdown() }}>
                                    <div style={{ backgroundColor: "#ED4C5C" }} className="w-2 h-2 rounded-full mx-4"></div>
                                    <p>Very High</p>
                                </div>
                                <div data-cy="modal-add-priority-high" className="flex items-center p-[14px] border-t" onClick={() => { setPrioritySelected('high'); handlePriorityDropdown() }} >
                                    <div style={{ backgroundColor: "#F8A541" }} className="w-2 h-2 rounded-full mx-4"></div>
                                    <p>High</p>
                                </div>
                                <div data-cy="modal-add-priority-medium" className="flex items-center p-[14px] border-t" onClick={() => { setPrioritySelected('medium'); handlePriorityDropdown() }}>
                                    <div style={{ backgroundColor: "#00A790" }} className="w-2 h-2 rounded-full mx-4"></div>
                                    <p>Medium</p>
                                </div>
                                <div data-cy="modal-add-priority-low" className="flex items-center p-[14px] border-t" onClick={() => { setPrioritySelected('low'); handlePriorityDropdown() }}>
                                    <div style={{ backgroundColor: "#428BC1" }} className="w-2 h-2 rounded-full mx-4"></div>
                                    <p>Low</p>
                                </div>
                                <div data-cy="modal-add-priority-very-low" className="flex items-center p-[14px] border-t" onClick={() => { setPrioritySelected('very-low'); handlePriorityDropdown() }}>
                                    <div style={{ backgroundColor: "#8942C1" }} className="w-2 h-2 rounded-full mx-4"></div>
                                    <p>Very Low</p>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-end border-t w-full">
                            <button data-cy="modal-add-save-button" onClick={() => { addTodo(); handleAddTodo(); emptyName() }} className="mr-4 bg-[#16ABF8] px-[40px] py-[12px] my-[15px] font-semibold text-lg text-white rounded-[45px] ">Simpan</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-11/12 md:max-w-xl xl:max-w-5xl mx-auto">
                <div className="flex justify-between mt-12">
                    <div className="flex items-center">
                        <Link to='/'>
                            <img data-cy="todo-back-button" src={BackIcon} alt="back button" onClick={() => navigate('/')} />
                        </Link>
                        <h2 data-cy="todo-title" className="font-bold text-xl md:text-4xl mr-4">Judul Activity</h2>
                        <img data-cy="todo-title-edit-button" src={EditButton} alt="edit title" />
                    </div>
                    <div className="flex relative">
                        <img data-cy="todo-sort-button" src={SortTodo} alt="sort button" onClick={handleSort} />
                        <div data-cy="sort-parent" className="sort-parent absolute w-[235px] top-[60px] left-0 rounded-[6px] shadow-lg" style={{ display: "none" }}>
                            <div data-cy="sort-latest" className="border-b rounded-t-[6px] p-[20px] flex justify-between items-center bg-white">
                                <div className="flex items-center">
                                    <img src={SortLatest} alt="sort latest img" />
                                    <p className="ml-4">Terbaru</p>
                                </div>
                                <img src={SortSelected} alt="sort latest selected icon" />
                            </div>
                            <div data-cy="sort-oldest" className="border-b rounded-t-[6px] p-[20px] flex justify-between items-center bg-white">
                                <div className="flex items-center">
                                    <img src={SortOldest} alt="sort oldest img" />
                                    <p className="ml-4">Terlama</p>
                                </div>
                                <img src={SortSelected} alt="sort latest selected icon" />
                            </div>
                            <div data-cy="sort-az" className="border-b rounded-t-[6px] p-[20px] flex justify-between items-center bg-white">
                                <div className="flex items-center">
                                    <img src={SortAZ} alt="sort A to Z img" />
                                    <p className="ml-4">A - Z</p>
                                </div>
                                <img src={SortSelected} alt="sort latest selected icon" />
                            </div>
                            <div data-cy="sort-za" className="border-b rounded-t-[6px] p-[20px] flex justify-between items-center bg-white">
                                <div className="flex items-center">
                                    <img src={SortZA} alt="sort Z to A img" />
                                    <p className="ml-4">Z - A</p>
                                </div>
                                <img src={SortSelected} alt="sort latest selected icon" />
                            </div>
                            <div data-cy="sort-unfinished" className="rounded-b-[6px] p-[20px] flex justify-between items-center bg-white">
                                <div className="flex items-center">
                                    <img src={SortUnfinished} alt="sort unfinished img" />
                                    <p className="ml-4">Belum Selesai</p>
                                </div>
                                <img src={SortSelected} alt="sort latest selected icon" />
                            </div>
                        </div>
                        <button data-cy="todo-add-button" className="ml-4 bg-[#16ABF8] rounded-full p-3 text-white font-semibold focus:ring focus:ring-sky-300" onClick={handleAddTodo}>+ Tambah</button>
                    </div>
                </div>
            </div>
            <section className="w-11/12 md:max-w-xl xl:max-w-5xl mx-auto mt-5">
                {/* box */}
                {
                    todoList.length >= 1 ? (
                        todoList?.map((res, i) => (
                            <div key={i} className="flex justify-between shadow-md bg-white p-6 rounded-[12px] my-[10px]">
                                <div className="flex items-center">
                                    <input style={{backgroundColor:"#16ABF8"}} onClick={() => { changeActiveStatus(res.is_active, res.id) }} data-cy="todo-item-checkbox" type="checkbox" name="" id="" />
                                    {priority(res.priority)}
                                    {
                                        res.is_active === 1 ? (<p data-cy="todo-item-title" className="mr-4">{res.title}</p>) : (<p data-cy="todo-item-title" className="line-through mr-4">{res.title}</p>)
                                    }
                                    <img data-cy="todo-item-edit-item" src={EditButton} alt="Edit Todo title button" />
                                </div>
                                <img onClick={() => { openDeleteModal(); setIdSelected(res.id) }} data-cy="todo-item-delete-button" src={Delete} alt="delete todo button" />
                            </div>
                        ))

                    ) : (EmptyTodoList)
                }
                {/* box end */}
            </section>
        </div>
    )
}

export default ItemListPage;