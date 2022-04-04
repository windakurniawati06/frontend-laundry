import React from "react"
import axios from "axios"
import domToPdf from "dom-to-pdf";
import Moment from 'react-moment'
// import { baseUrl } from "../config"
import { baseUrl, authorization, formatNumber } from "../config";

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            transaksi: []
        }
    }

    getData() {
        let endpoint = "http://localhost:8000/transaksi"
        axios.get(endpoint, authorization)
            .then(response => {
                let dataTransaksi = response.data
                for (let i = 0; i < dataTransaksi.length; i++) {
                    let total = 0;
                    for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                        let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                        let qyt = dataTransaksi[i].detail_transaksi[j].qyt

                        total += (harga * qyt)
                    }

                    //tambahkan key "total"
                    dataTransaksi[i].total = total

                }

                this.setState({ transaksi: dataTransaksi })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getData()
    }

    convertStatus(id_transaksi, status) {
        if (status === 1) {
            return (
                <div className="badge bg-info">
                    Transaksi Baru

                    <br />
                    <a onClick={() => this.changeStatus(id_transaksi, 2)} className="text-danger">
                        Click here to the next level
                    </a>
                </div>
            )
        } else if (status === 2) {
            return (
                <div className="badge bg-warning">
                    Sedang di Proses
                    <br />
                    <a onClick={() => this.changeStatus(id_transaksi, 3)} className="text-danger">
                        Click here to the next level
                    </a>
                </div>
            )
        } else if (status === 3) {
            return (
                <div className="badge bg-secondary">
                    Siap Diambil
                    <br />
                    <a onClick={() => this.changeStatus(id_transaksi, 4)} className="text-danger">
                        Click here to the next level
                    </a>
                </div>
            )
        } else if (status === 4) {
            return (
                <div className="badge bg-success">
                    Telah Diambil
                </div>
            )
        }
    }

    changeStatus(id, status) {
        if (window.confirm(`Apakah Anda Yakin Ingin Mengganti Status Transaksi Ini?`)) {
            let endpoint = `${baseUrl}/transaksi/status/${id}`
            let data = {
                status: status
            }

            axios
                .post(endpoint, data, authorization)
                .then(response => {
                    window.alert(`Status transaksi telah diubah`)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }
    //     axios.post(endpoint, data, authorization)
    //         .then(response =>{
    //             window.alert(`Status transaksi telah diubah`)
    //             this.getData()

    //             // this.setState({ transaksi: response.data }))
    //         .catch(error => console.log(error))
    // }


    changeStatusBayar(id, status) {
        if (window.confirm(`Apakah Anda yakin ingin mengubah status pembayaran ini?`)) {
            let endpoint = `${baseUrl}/transaksi/bayar/${id}`
            axios.get(endpoint, authorization)
                .then(response => {
                    window.alert(`Status pembayaran telah diubah`)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }

    convertStatusBayar(id_transaksi, dibayar) {
        if (dibayar === 0) {
            return (
                <div className="badge bg-danger text-white">
                    Belum Dibayar

                    <br />

                    <a className="text-primary"
                        onClick={() => this.changeStatusBayar(id_transaksi, 1)}>
                        Click here to change paid status
                    </a>
                </div>
            )
        } else if (dibayar === 1) {
            return (
                <div className="badge bg-success text-white">
                    Sudah Dibayar
                </div>
            )
        }
    }


    deleteTransaksi(id) {
        if (window.confirm(`Apakah anda yakin ingin menghapus transaksi ini?`)) {
            let endpoint = `${baseUrl}/transaksi/${id}`
            axios.delete(endpoint, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }

    convertPdf() {
        //ambil element yang akan diconvert ke pdf
        let element = document.getElementById(`target`)
        let options = {
            filename: "Rincian Data Transaksi.pdf"
        }

        domToPdf(element, options, () => {
            window.alert("file will download soon")
        })
    }

    printStruk(id) {
        var element = document.getElementById(`struk${id}`);
        var options = {
            filename: `struk-${id}.pdf`
        };
        domToPdf(element, options, function (pdf) {
            window.alert(`Struk will download soon`)
        });
    }

    render() {
        const target = React.createRef()
        return (
            <div className="card" style={{ backgroundColor: '#69DADB' }}>
                <div className="card-header" >
                    <button className="btn btn-danger"
                        onClick={() => this.convertPdf()}>
                        Convert to PDF
                    </button>

                    <div className="card-body">
                        <div id="target">
                            <h3 className="text-white"><i class="fa-solid fa-cart-shopping mx-3"></i>
                                List Transaksi
                            </h3>

                            <ul className="list-group">
                                {this.state.transaksi.map(trans => (
                                    <li className="list-group-item">
                                        <div className="row">
                                            {/* this is member area */}
                                            <div className="col-lg-3">
                                                <small className="text-info">
                                                    Member
                                                </small> <br />
                                                {trans.member.nama}
                                            </div>

                                            {/* this is tgl transaksi area  */}
                                            <div className="col-lg-3">
                                                <small className="text-info">
                                                    Tanggal Transaksi
                                                </small> <br />
                                                <Moment format="D MMM YYYY">
                                                {trans.tgl}
                                                </Moment>
                                            </div>

                                            {/* this is batas waktu area  */}
                                            <div className="col-lg-3">
                                                <small className="text-info">
                                                    Batas Waktu
                                                </small> <br />
                                                <Moment format="D MMM YYYY">
                                                {trans.batas_waktu}
                                                </Moment>
                                            </div>

                                            {/* this is tanggal bayar area  */}
                                            <div className="col-lg-3">
                                                <small className="text-info">
                                                    Tanggal Bayar
                                                </small> <br />
                                                <Moment format="D MMM YYYY">
                                                {trans.tgl_bayar}
                                                </Moment>
                                            </div>
                                            {/* this is status area  */}
                                            <div className="col-lg-3">
                                                <small className="text-info">
                                                    Status
                                                </small> <br />
                                                {this.convertStatus(trans.id_transaksi, trans.status)}
                                            </div>

                                            {/* this is status pembayaran  */}
                                            <div className="col-lg-3">
                                                <small className="text-info">
                                                    Status Pembayaran
                                                </small> <br />
                                                {this.convertStatusBayar(trans.id_transaksi, trans.dibayar)}
                                            </div>

                                            {/* this is total */}
                                            <div className="col-lg-3">
                                                <small className="text-info">
                                                    Total :
                                                </small> <br />
                                                Rp {trans.total}
                                            </div>

                                            {/* this is struk area */}
                                            <div className="col-lg-1">
                                                <small className="text-info">
                                                    Nota
                                                </small><br />
                                                <small className="btn btn-success btn-sm text-white"
                                                    onClick={() => this.printStruk(trans.id_transaksi)}>
                                                    <i class="fa-solid fa-file-invoice-dollar"></i>
                                                </small>
                                            </div>

                                            <div style={{ display: `none` }}>
                                                <div className="col-lg-12 p-3"
                                                    id={`struk${trans.id_transaksi}`}>
                                                    <h3 className="text-info1 text-center"><i class="fa-solid fa-soap mx-1"></i>
                                                        Timmy Laundry
                                                    </h3>
                                                    <h5 className="text-center">
                                                        Jl. Danau Buyan G7F8, Sawojajar, Kota Malang
                                                        <br />
                                                        Telp: 089680593722 | IG: @Timmy_Laundry
                                                    </h5>

                                                    <h4>Member: {trans.member.nama}</h4>
                                                    <h4>Tgl: <Moment format="D MMM YYYY">{trans.tgl}</Moment></h4>

                                                    <div className="row mt-3"
                                                        style={{ borderBottom: `1px dotted black` }}>
                                                        <div className="col-4">
                                                            <h5>Paket</h5>
                                                        </div>
                                                        <div className="col-2">
                                                            <h5>Qty</h5>
                                                        </div>
                                                        <div className="col-3">
                                                            <h5>Harga Satuan</h5>
                                                        </div>
                                                        <div className="col-3">
                                                            <h5>Total</h5>
                                                        </div>
                                                    </div>

                                                    {trans.detail_transaksi.map(item => (
                                                        <div className="row mt-3"
                                                            style={{ borderBottom: `1px dotted black` }}>
                                                            <div className="col-4">
                                                                <h5>{item.paket.jenis_paket}</h5>
                                                            </div>
                                                            <div className="col-2">
                                                                <h5>{item.qyt}</h5>
                                                            </div>
                                                            <div className="col-3">
                                                                <h5>Rp {formatNumber(item.paket.harga)}</h5>
                                                            </div>
                                                            <div className="col-3">
                                                                <h5>Rp {formatNumber(item.paket.harga * item.qyt)}</h5>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <div className="row mt-2">
                                                        <div className="col-lg-9"></div>
                                                        <div className="col-lg-3">
                                                            <h4>Rp {formatNumber(trans.total)}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* this is delete button */}
                                            <div className="col-lg-2">
                                                <small className="text-info">
                                                    Option
                                                </small> <br />
                                                <small className="btn btn-sm btn-danger"
                                                    onClick={() => this.deleteTransaksi(trans.id_transaksi)}>
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </small>
                                            </div>
                                        </div>

                                        {/* Area detail transaksi */}
                                        <br />
                                        <h5>Detail Transaksi</h5>
                                        {trans.detail_transaksi.map(detail => (
                                            <div className="row">
                                                {/* area nama paket col-3*/}
                                                <div className="col-lg-3">
                                                    {detail.paket.jenis_paket}
                                                </div>
                                                {/* area quantity col-2*/}
                                                <div className="col-lg-2">
                                                    Qty : {detail.qyt}
                                                </div>
                                                {/* area harga paket col-3*/}
                                                <div className="col-lg-3">
                                                    @ Rp {detail.paket.harga}
                                                </div>
                                                {/* area harga total col-4*/}
                                                <div className="col-lg-4">
                                                    Rp {detail.paket.harga * detail.qyt}
                                                </div>
                                            </div>
                                        ))}

                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}