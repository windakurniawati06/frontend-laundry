import React from "react"
import { Modal } from "bootstrap";
import axios from "axios";
import { baseUrl, formatNumber, authorization } from "../config";

class Paket extends React.Component {
    constructor() {
        super()
        this.state = {
            id_paket: "",
            jenis_paket: "",
            harga: "",
            action: "",
            role: "",
            visible: true,
            pakets: [
                {
                    id_paket: "1", jenis_paket: "Dress", harga: "20.000"
                },
                {
                    id_paket: "2", jenis_paket: "Seragam Sekolah", harga: "50.000"
                },
                {
                    id_paket: "3", jenis_paket: "Hijab", harga: "10.000"
                },
                {
                    id_paket: "4", jenis_paket: "Boneka", harga: "60.000"
                },
            ]
        }
    }

    tambahData() {
        this.modalPaket = new Modal(document.getElementById("modal_paket"))
        this.modalPaket.show() //menampilkan modal
        //reset state untuk form paket
        this.setState({
            id_paket: "",
            jenis_paket: "",
            harga: "",
            action: "tambah"
        })
    }

    hapusData(id_paket) {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let endpoint = "http://localhost:8000/paket/" + id_paket

            axios.delete(endpoint, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
            //mancari posisi index dari data yang akan dihapus
            // let temp = this.state.pakets
            // let index = temp.findIndex(paket => paket.id_paket === id_paket)

            // //dihapus datanya pada array
            // temp.splice(index,1)

            // this.setState({pakets: temp})
        }
    }

    ubahData(id_paket) {
        this.modalPaket = new Modal(document.getElementById("modal_paket"))
        this.modalPaket.show() //menampilkan modal
        //reset state untuk form paket

        //mencari index posisi dari data paket yang mau diubah
        let index = this.state.pakets.findIndex(
            paket => paket.id_paket === id_paket
        )

        this.setState({
            id_paket: id_paket,
            jenis_paket: this.state.pakets[index].jenis_paket,
            harga: this.state.pakets[index].harga,
            action: "ubah"
        })
    }

    simpanData(event) {
        event.preventDefault();
        //prevenDefault -> digunakan untuk mencegah aksi default dari form submit.

        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/paket"
            //menampung data isian dari user
            let data = {
                id_paket: this.state.id_paket,
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga,
            }

            // // tambahkan ke state pakets (array)
            // let temp = this.state.pakets
            // temp.push(data)//menambah data dalam array
            // this.setState({ pakets: temp })
            axios.post(endpoint, data, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            //menghilangkan modal
            this.modalPaket.hide()
        } else if (this.state.action === "ubah") {
            let endpoint = "http://localhost:8000/paket/" + this.state.id_paket
            let data = {
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga,
                id_paket: this.state.id_paket
            }

            axios.put(endpoint, data, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
            // let temp = this.state.pakets
            // let index = temp.findIndex(
            //     paket => paket.id_paket === this.state.id_paket
            // )

            // temp[index].harga = this.state.harga
            // temp[index].jenis_paket = this.state.jenis_paket

            // this.setState({pakets: temp})

            this.modalPaket.hide()
        }

    }

    getData() {
        let endpoint = "http://localhost:8000/paket"
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ pakets: response.data })
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

    render() {
        return (
            <div className="container my-3">
                <div className="card">
                    <div className="card-header bg-success1">
                        <h3 className="text-white"><i class="fa-solid fa-box-open mx-3"></i>
                            List of Packages
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="col-lg-3">
                        <button className={`btn btn-color my-1 text-white
                        ${this.state.visible ? `` : `d-none`}`}
                            onClick={() => this.tambahData()}><i class="fa-regular fa-plus mx-2"></i>
                            Tambah Paket
                        </button>
                        </div>

                        <ul className="list-group">
                            {this.state.pakets.map(paket => (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <small className="text-info">Jenis Paket</small> <br />
                                            <h5>{paket.jenis_paket}</h5>
                                        </div>
                                        <div className="col-lg-5">
                                            <small className="text-info">Harga</small> <br />
                                            <h5>{paket.harga}</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-info">Action</small> <br />
                                            <small className={`btn btn-sm btn-warning mx-1 mt-2
                                            ${this.state.visible ? `` : `d-none`}`}
                                                onClick={() => this.ubahData(paket.id_paket)}>
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </small>

                                            <small className={`btn btn-sm btn-danger mx-1 mt-2
                                            ${this.state.visible ? `` : `d-none`}`}
                                                onClick={() => this.hapusData(paket.id_paket)}>
                                                <i class="fa-solid fa-trash-can"></i>
                                            </small>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* form modal data Paket */}
                <div className="modal" id="modal_paket">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-form">
                                <h4 className="text-white">
                                    Form Data Paket
                                </h4>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Jenis Paket
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.jenis_paket}
                                        onChange={(ev) => this.setState({ jenis_paket: ev.target.value })} />

                                    Harga
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.harga}
                                        onChange={(ev) => this.setState({ harga: ev.target.value })} />

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

export default Paket