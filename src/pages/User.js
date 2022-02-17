import React from "react"
import { Modal } from "bootstrap";
import axios from "axios";

class User extends React.Component{
    constructor(){
        super()
        this.state = {
            id_user:"",
            username:"",
            password:"",
            role:"",
            action:"",
            visible: true,
            users: [
                {
                    id_user:"1", username:"Dani", role:"admin"
                },
                {
                    id_user:"2", username:"Mila", role:"admin"
                },
                {
                    id_user:"3", username:"Diki", role:"kasir"
                },
                {
                    id_user:"4", username:"Rokib", role:"kasir"
                },
            ]
        }
    }

    tambahData(){
        this.modalUser = new Modal(document.getElementById("modal_user"))
        this.modalUser.show() //menampilkan modal
        //reset state untuk form user
        this.setState({
            id_user: "",
            username:"",
            password:"",
            nama:"",
            role:"",
            action: "tambah"
        })
    }

    hapusData(id_user) {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let endpoint = "http://localhost:8000/users/" + id_user

            axios.delete(endpoint)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))
            //mancari posisi index dari data yang akan dihapus
            // let temp = this.state.users
            // let index = temp.findIndex(user => user.id_user === id_user)

            // //dihapus datanya pada array
            // temp.splice(index,1)

            // this.setState({users: temp})
        }
    }

    ubahData(id_user){
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
            password: this.state.users[index].password,
            nama: this.state.users[index].nama,
            role: this.state.users[index].role,
            action: "ubah"
        })
    }

    simpanData(event) {
        event.preventDefault();
        //prevenDefault -> digunakan untuk mencegah aksi default dari form submit.

        if (this.state.action === "tambah") {
            let endpoint ="http://localhost:8000/users"
            //menampung data isian dari user
            let data = {
                id_user: this.state.id_user,
                username: this.state.username, 
                password: this.state.password,
                nama: this.state.nama,
                role: this.state.role,
            }

            // // tambahkan ke state users (array)
            // let temp = this.state.users
            // temp.push(data)//menambah data dalam array
            // this.setState({ users: temp })
            axios.post(endpoint, data)
            .then(response =>{
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))

            //menghilangkan modal
            this.modalUser.hide()
        } else if (this.state.action === "ubah") {
            let endpoint ="http://localhost:8000/users/" + this.state.id_user
            let data = {
                id_user: this.state.id_user,
                username: this.state.username,
                password: this.state.password, 
                nama: this.state.nama,
                role: this.state.role,
            }

            axios.put(endpoint, data)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))
            // let temp = this.state.users
            // let index = temp.findIndex(
            //     user => user.id_user === this.state.id_user
            // )

            // temp[index].harga = this.state.harga
            // temp[index].jenis_user = this.state.jenis_user

            // this.setState({users: temp})

            this.modalUser.hide()
        }

    }

    getData(){
        let endpoint = "http://localhost:8000/users"
        axios.get(endpoint)
        .then(response =>{
            this.setState({users: response.data})
        })
        .catch(error => console.log(error))
    }

    componentDidMount(){
        //fungsi ini dieksekusi/dijalankan setelah fungsi render berjalan
        this.getData()
        let user = JSON.parse(localStorage.getItem("user"))

        if (user.role === 'admin') {
            this.setState({
                visible: true
            })
        } else {
            this.setState({
                visible: false
            })
        }
    }

    render(){
        return(
            <div className="container">
                <div className="card">
                    <div className="card-header bg-info">
                        <h3 className="text-white">
                            List of Users
                        </h3>
                    </div>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.users.map(user =>(
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
                                            <button className={`btn btn-sm btn-warning mx-1
                                            ${this.state.visible ? `` : `d-none`}`}
                                            onClick={() => this.ubahData(user.id_user)}>
                                                Edit
                                            </button>

                                            <button className={`btn btn-sm btn-danger
                                            ${this.state.visible ? `` : `d-none`}`}
                                            onClick={() => this.hapusData(user.id_user)}>
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <button className={`btn btn-info my-1
                        ${this.state.visible ? `` : `d-none`}`}
                        onClick={() => this.tambahData()}>
                            Tambahkan User
                        </button>
                    </div>
                </div>
                {/* form modal data user */}
                    <div className="modal" id="modal_user">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header bg-info">
                                    <h4 className="text-white">
                                        Form Data User
                                    </h4>
                                </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Nama
                                    <input type="text" className="form-control mb-2" 
                                    value={this.state.nama} 
                                    onChange={(ev) => this.setState({nama:ev.target.value})}/>

                                    Password
                                    <input type="password" className="form-control mb-2"
                                    value={this.state.password}
                                    onChange={(ev) => this.setState({password:ev.target.value})}/>

                                    Username
                                    <input type="text" className="form-control mb-2" 
                                    value={this.state.username} 
                                    onChange={(ev) => this.setState({username:ev.target.value})}/>
                                    
                                    Role
                                    <select className="form-control mb-2"
                                        value={this.state.role}
                                        onChange={(ev) => this.setState({ role:ev.target.value })}>
                                        <option value="Admin">Admin</option>
                                        <option value="Kasir">Kasir</option>
                                    </select>

                                    <button className="btn btn-info" type="submit">
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