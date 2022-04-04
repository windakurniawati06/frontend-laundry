import React from "react"
import { Modal } from "bootstrap";
import axios from "axios";
import { baseUrl, formatNumber, authorization } from "../config";

class User extends React.Component {
    constructor() {
        super()
        this.state = {
            id_user: "",
            username: "",
            password: "",
            role: "",
            action: "",
            fillPassword: true,
            visible: true,
            users: [
                {
                    id_user: "1", username: "Dani", role: "admin"
                },
                {
                    id_user: "2", username: "Mila", role: "admin"
                },
                {
                    id_user: "3", username: "Diki", role: "kasir"
                },
                {
                    id_user: "4", username: "Rokib", role: "kasir"
                },
            ]
        }
    }

    tambahData() {
        this.modalUser = new Modal(document.getElementById("modal_user"))
        this.modalUser.show() //menampilkan modal
        //reset state untuk form user
        this.setState({
            id_user: Math.random(1, 100000),
            username: "",
            password: "",
            nama: "",
            role: "",
            action: "tambah",
            fillPassword: true
        })
    }

    hapusData(id_user) {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let endpoint = "http://localhost:8000/users/" + id_user

            axios.delete(endpoint, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }

    ubahData(id_user) {
        this.modalUser = new Modal(document.getElementById("modal_user"))
        this.modalUser.show() //menampilkan modal
        //reset state untuk form user

        //mencari index posisi dari data user yang mau diubah
        let index = this.state.users.findIndex(
            user => user.id_user === id_user
        )

        this.setState({
            id_user: id_user,
            username: this.state.users[index].username,
            password: "",
            nama: this.state.users[index].nama,
            role: this.state.users[index].role,
            action: "ubah",
            fillPassword: false,
        })
    }

    simpanData(event) {
        if (document.getElementById("nama").value == "") {
			alert("Missing Nama");
			return;
		}
		if (document.getElementById("username").value == "") {
			alert("Missing Username");
			return;
		}
        if (document.getElementById("password").value == "") {
			alert("Missing Password");
			return;
		}
        if (document.getElementById("role").value == "") {
			alert("Missing Role");
			return;
		}

        event.preventDefault();
        //prevenDefault -> digunakan untuk mencegah aksi default dari form submit.

        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/users"
            //menampung data isian dari user
            let data = {
                id_user: this.state.id_user,
                username: this.state.username,
                password: this.state.password,
                nama: this.state.nama,
                role: this.state.role
            }

            axios.post(endpoint, data, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            //menghilangkan modal
            this.modalUser.hide()
        } else if (this.state.action === "ubah") {
            let endpoint = "http://localhost:8000/users/" + this.state.id_user
            let data = {
                id_user: this.state.id_user,
                username: this.state.username,
                nama: this.state.nama,
                role: this.state.role,
            }

            if (this.state.fillPassword === true) {
                data.password = this.state.password
            }

            axios.put(endpoint, data, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            this.modalUser.hide()
        }

    }

    getData() {
        let endpoint = "http://localhost:8000/users"
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ users: response.data })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        //fungsi ini dieksekusi/dijalankan setelah fungsi render berjalan
        this.getData()
        let user = JSON.parse(localStorage.getItem("user"))

        if (user.role === 'Admin') {
            this.setState({
                visible: true
            })
        } else {
            this.setState({
                visible: false
            })
        }
    }

    showPassword() {
        if (this.state.fillPassword === true) {
            return (
                <div>
                    password
                    <input type="password" className="form-control mb-1" id="password"
                        required
                        value={this.state.password}
                        onChange={ev => this.setState({ password: ev.target.value })}
                    />
                </div>
            )
        } else {
            return (
                <button className="mb-1 btn btn-save text-white"
                    onClick={() => this.setState({ fillPassword: true })}>
                    Change password
                </button>
            )
        }
    }

    render() {
        return (
            <div className="container my-3">
                <div className="card">
                    <div className="card-header bg-success1">
                        <h3 className="text-white"><i class="fa-solid fa-user-group mx-3"></i>
                            List of Users
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="col-lg-3">
                        <button className={`btn btn-color my-1 text-white
                        ${this.state.visible ? `` : `d-none`}`}
                            onClick={() => this.tambahData()}><i class="fa-regular fa-plus mx-2"></i>
                            Tambah User
                        </button>
                        </div>
                        <ul className="list-group">
                            {this.state.users.map(user => (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <small className="text-info">Nama</small> <br />
                                            <h5>{user.nama}</h5>
                                        </div>
                                        <div className="col-lg-4">
                                            <small className="text-info">Username</small> <br />
                                            <h5>{user.username}</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-info">Role</small> <br />
                                            <h5>{user.role}</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-info">Action</small> <br />
                                            <small className={`btn btn-sm btn-warning mx-1 mt-2
                                            ${this.state.visible ? `` : `d-none`}`}
                                                onClick={() => this.ubahData(user.id_user)}>
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </small>

                                            <small className={`btn btn-sm btn-danger mx-1 mt-2
                                            ${this.state.visible ? `` : `d-none`}`}
                                                onClick={() => this.hapusData(user.id_user)}>
                                                <i class="fa-solid fa-trash-can"></i>
                                            </small>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* form modal data user */}
                <div className="modal" id="modal_user">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-form">
                                <h4 className="text-white">
                                    Form Data User
                                </h4>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>

                                    
                                    Nama
                                    <input type="text" className="form-control mb-2" id="nama"
                                        value={this.state.nama}
                                        onChange={(ev) => this.setState({ nama: ev.target.value })} />

                                    Username
                                    <input type="text" className="form-control mb-2" id="username"
                                        value={this.state.username}
                                        onChange={(ev) => this.setState({ username: ev.target.value })} />

                                    {this.showPassword()}

                                    Role
                                    <select className="form-control mb-2" id="role"
                                        value={this.state.role}
                                        onChange={(ev) => this.setState({ role: ev.target.value })}>
                                        <option value="">--Pilih Role--</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Kasir">Kasir</option>
                                    </select>

                                    <button className="btn btn-save text-white" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User