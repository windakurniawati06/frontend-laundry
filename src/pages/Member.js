import React from "react"
import { Modal } from "bootstrap";
import axios from "axios";

class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            id_member: Math.random(1, 100000),
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            telepon: "",
            action: "",
            role: "",
            visible: true,
            members: [
                {
                    id_member: "1", nama: "Kylie",
                    alamat: "Jalan Khr abdul fattah 4/1", jenis_kelamin: "Wanita",
                    telepon: "08998989"
                },
                {
                    id_member: "2", nama: "Justin",
                    alamat: "New York", jenis_kelamin: "Pria",
                    telepon: "08123456"
                },
                {
                    id_member: "3", nama: "Avril Lavigne",
                    alamat: "Hamburg", jenis_kelamin: "Wanita",
                    telepon: "083456789"
                }
            ]
        }
    }

    tambahData() {
        this.modalMember = new Modal(document.getElementById("modal_member"))
        this.modalMember.show() //menampilkan modal
        //reset state untuk form Member
        this.setState({
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "Wanita",
            telepon: "",
            action: "tambah"
        })
    }

    hapusData(id_member) {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let endpoint = "http://localhost:8000/member/" + id_member

            axios.delete(endpoint)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
            //mancari posisi index dari data yang akan dihapus
            // let temp = this.state.members
            // let index = temp.findIndex(member => member.id_member === id_member)

            //dihapus datanya pada array
            // temp.splice(index,1)

            // this.setState({members: temp})
        }
    }

    ubahData(id_member) {
        this.modalMember = new Modal(document.getElementById("modal_member"))
        this.modalMember.show() //menampilkan modal
        //reset state untuk form Member

        //mencari index posisi dari data member yang mau diubah
        let index = this.state.members.findIndex(
            member => member.id_member === id_member
        )


        this.setState({
            id_member: id_member,
            nama: this.state.members[index].nama,

            alamat: this.state.members[index].alamat,
            jenis_kelamin: this.state.members[index].jenis_kelamin,
            telepon: this.state.members[index].telepon,
            action: "ubah"
        })
    }

    simpanData(event) {
        event.preventDefault();
        //prevenDefault -> digunakan untuk mencegah aksi default dari form submit.

        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/member"
            //menampung data isian dari user
            let data = {
                nama: this.state.nama,
                alamat: this.state.alamat,
                jenis_kelamin: this.state.jenis_kelamin,
                telepon: this.state.telepon,
                id_member: this.state.id_member
            }

            // tambahkan ke state members (array)
            // let temp = this.state.members
            // temp.push(data)//menambah data dalam array
            // this.setState({ members: temp })
            axios.post(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            //menghilangkan modal
            this.modalMember.hide()
        } else if (this.state.action === "ubah") {
            let endpoint = "http://localhost:8000/member/" + this.state.id_member
            let data = {
                nama: this.state.nama,
                alamat: this.state.alamat,
                jenis_kelamin: this.state.jenis_kelamin,
                telepon: this.state.telepon,
                id_member: this.state.id_member
            }

            axios.put(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            // let temp = this.state.members
            // let index = temp.findIndex(
            //     member => member.id_member === this.state.id_member
            // )

            // temp[index].nama = this.state.nama
            // temp[index].alamat = this.state.alamat
            // temp[index].telepon = this.state.telepon
            // temp[index].jenis_kelamin = this.state.jenis_kelamin

            // this.setState({members: temp})

            this.modalMember.hide()
        }

    }

    getData() {
        let endpoint = "http://localhost:8000/member"
        axios.get(endpoint)
            .then(response => {
                this.setState({ members: response.data })
            })
            .catch(error => console.log(error))
    }

    showAddButton() {
        if (this.state.role === 'admin' || this.state.role === 'kasir') {
            return (
                <button className="btn btn-success my-1"
                    onClick={() => this.tambahData()}>
                    Tambahkan Data
                </button>
            )
        }
    }

    componentDidMount() {
        //fungsi ini dieksekusi/dijalankan setelah fungsi render berjalan
        this.getData()
        let user = JSON.parse(localStorage.getItem("user"))

        //cara pertama
        this.setState({
            role: user.role
        })

        //cara kedua
        if (user.role === 'admin' || user.role === 'kasir') {
            this.setState({
                visible: true
            })
        } else {
            this.setState({
                visible: false
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header bg-success">
                        <h3 className="text-white">
                            List of Members
                        </h3>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {this.state.members.map(member => (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <small className="text-info">Nama</small> <br />
                                            <h5>{member.nama}</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-info">Jenis Kelamin</small> <br />
                                            <h5>{member.jenis_kelamin}</h5>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-info">Telepon</small> <br />
                                            <h5>{member.telepon}</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-info">Action</small> <br />
                                            <button className={`btn btn-sm btn-warning mx-1 
                                            ${this.state.visible ? `` : `d-none`}`}
                                                onClick={() => this.ubahData(member.id_member)}>
                                                Edit
                                            </button>

                                            <button className={`btn btn-sm btn-danger 
                                            ${this.state.visible ? `` : `d-none`}`}
                                                onClick={() => this.hapusData(member.id_member)}>
                                                Hapus
                                            </button>
                                        </div>
                                        <div className="col-lg-11">
                                            <small className="text-info">Alamat</small> <br />
                                            <h5>{member.alamat}</h5>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="col-lg-3">
                            {this.showAddButton()}
                        </div>
                    </div>
                </div>

                {/* form modal data member */}
                <div className="modal" id="modal_member">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4 className="text-white">
                                    Form Data Member
                                </h4>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Nama
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.nama}
                                        onChange={(ev) => this.setState({ nama: ev.target.value })} />

                                    Alamat
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.alamat}
                                        onChange={(ev) => this.setState({ alamat: ev.target.value })} />

                                    Jenis Kelamin
                                    <select className="form-control mb-2"
                                        value={this.state.jenis_kelamin}
                                        onChange={(ev) => this.setState({ jenis_kelamin: ev.target.value })}>
                                        <option value="Perempuan">Perempuan</option>
                                        <option value="Laki laki">Laki laki</option>
                                    </select>

                                    Telepon
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.telepon}
                                        onChange={(ev) => this.setState({ telepon: ev.target.value })} />

                                    <button className="btn btn-success" type="submit">
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


export default Member