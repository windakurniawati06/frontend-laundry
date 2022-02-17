import React from "react"
import axios from "axios"
import { baseUrl } from "../config"

export default class Transaksi extends React.Component{
    constructor(){
        super()
        this.state = {
            transaksi: []
        }
    }

    getData(){
        let endpoint = "http://localhost:8000/transaksi"
        axios.get(endpoint)
        .then(response => {
            let dataTransaksi = response.data
            for (let i = 0; i< dataTransaksi.length; i++) {
              let total = 0;
              for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                  let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                  let qyt = dataTransaksi[i].detail_transaksi[j].qyt

                  total += (harga * qyt)
              }

              //tambahkan key "total"
              dataTransaksi[i].total = total
               
            }

            this.setState({transaksi: dataTransaksi})
        })
        .catch(error => console.log(error))
    }

    componentDidMount(){
        this.getData()
    }

    convertStatus(id_transaksi, status){
        if(status === 1 ){
            return ( 
                <div className="badge bg-info">
                    Transaksi Baru

                    <br />
                    <a onClick={() => this.changeStatus(id_transaksi, 2)} className="text-danger">
                        Click here to the next level
                    </a>
                </div>
            )
        } else if(status === 2) {
            return (
                <div className="badge bg-warning">
                    Sedang di Proses
                    <br />
                    <a onClick={() => this.changeStatus(id_transaksi, 3)} className="text-danger">
                        Click here to the next level
                    </a>
                </div>
            )
        }else if(status === 3){
            return (
                <div className="badge bg-secondary">
                    Siap Diambil
                    <br />
                    <a onClick={() => this.changeStatus(id_transaksi, 4)} className="text-danger">
                        Click here to the next level
                    </a>
                </div>
            )
        }else if(status === 4){
            return (
                <div className="badge bg-success">
                    Telah Diambil
                </div>
            )
        }
    }

    changeStatus(id, status){
        if(window.confirm(`Apakah Anda Yakin Ingin Mengganti Status Transaksi Ini?`)){
            let endpoint = `${baseUrl}/transaksi/status/${id}`
            let data = {
                status : status
            }

            axios.post(endpoint, data)
            .then(response =>
                this.setState({transaksi: response.data}))
            .catch(error => console.log(error))
        }
    }

    convertStatusBayar(id_transaksi, dibayar){
        if(dibayar == 0){
            return (
                <div className="badge bg-danger text-white">
                    Belum Dibayar
                </div>
            )
        } else if(dibayar == 1){
        return (
            <div className="badge bg-danger text-white">
                Sudah Dibayar
            </div>
        )
        }
    }

    deleteTransaksi(id){
        if(window.confirm(`Apakah anda yakin ingin menghapus transaksi ini?`)){
            let endpoint = `${baseUrl}/transaksi/${id}`
            axios.delete(endpoint)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))
        }
    }

    changeStatusBayar(id, status){
        if(window.confirm(`Apakah Anda yakin ingin mengubah status pembayaran ini?`)) {
            let endpoint = `${baseUrl}/transaksi/bayar/${id}`
            axios.get(endpoint)
            .then(response => {
                window.alert(`Status pembayaran telah diubah`)
                this.getData()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return (
            <div className="card">
                <div className="card-header bg-info">
                    <h4 className="text-white">
                        List Transaksi
                    </h4>
                </div>
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
                                        {trans.tgl}
                                    </div>

                                    {/* this is batas waktu area  */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Batas Waktu
                                        </small> <br />
                                        {trans.batas_waktu}
                                    </div>
                                    
                                    {/* this is tanggal bayar area  */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Tanggal Bayar
                                        </small> <br />
                                        {trans.tgl_bayar}
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

                                    {/* this is delete button */}
                                    <div className="col-lg-3">
                                    <small className="text-info">
                                            Option
                                        </small> <br />
                                        <button className="btn btn-sm btn-danger"
                                        onClick={() => this.deleteTransaksi(trans.id_transaksi)}>
                                            Hapus
                                        </button>
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
                <div className="card-body">
 
                </div>
            </div>
        )
    }
}