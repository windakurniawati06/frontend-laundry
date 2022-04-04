import React from "react"
import axios from "axios"
import { baseUrl, formatNumber, authorization } from "../config"


export default class Dashboard extends React.Component {
    constructor() {
        super()

        this.state = {
            jmlMember: 0,
            jmlPaket: 0,
            jmlTransaksi: 0,
            income: 0
        }

        if (!localStorage.getItem("token")) {
            window.location.href = "/login"
        }
    }

    getSummary() {

        //get jumlah member
        let endpoint = `${baseUrl}/member`
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ jmlMember: response.data.length })
            })
            .catch(error => console.log(error))

        //get jumlah paket
        endpoint = `${baseUrl}/paket`
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ jmlPaket: response.data.length })
            })
            .catch(error => console.log(error))

        //get jumlah transaksi
        endpoint = `${baseUrl}/transaksi`
        axios.get(endpoint, authorization)
            .then(response => {
                let dataTransaksi = response.data
                let income = 0
                for (let i = 0; i < dataTransaksi.length; i++) {
                    let total = 0;
                    for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                        let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                        let qyt = dataTransaksi[i].detail_transaksi[j].qyt

                        total += (harga * qyt)
                    }

                    income += total

                }
                this.setState({
                    jmlTransaksi: response.data.length,
                    income: income
                })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getSummary()
    }

    render() {
        return (
            <div className="container ">
                <div className="row">
                <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4 mt-3">
                        <div class="card">
                            <div class="card-header p-3 pt-2">
                                <div class="text-center pt-1">
                                    <p class="text-sm mb-0 text-capitalize"><i class="fa-solid fa-users mx-2"></i>Members</p>
                                    <h4 class="mb-0">{this.state.jmlMember}</h4>
                                </div>
                            </div>
                            <hr class="dark horizontal my-0" />
                            <div class="card-footer p-3">
                                <p class="mb-0"><span class="text-success text-sm font-weight-bolder">Members have joined</span></p>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4 mt-3">
                        <div class="card">
                            <div class="card-header p-3 pt-2">
                                <div class="text-center pt-1">
                                    <p class="text-sm mb-0 text-capitalize"><i class="fa-solid fa-box-open mx-2"></i>Packages</p>
                                    <h4 class="mb-0">{this.state.jmlPaket}</h4>
                                </div>
                            </div>
                            <hr class="dark horizontal my-0" />
                            <div class="card-footer p-3">
                                <p class="mb-0"><span class="text-success text-sm font-weight-bolder">Available packages</span></p>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4 mt-3">
                        <div class="card">
                            <div class="card-header p-3 pt-2">
                                <div class="text-center pt-1">
                                    <p class="text-sm mb-0 text-capitalize"><i class="fa-solid fa-tent-arrow-left-right mx-2"></i>Transaction</p>
                                    <h4 class="mb-0">{this.state.jmlTransaksi}</h4>
                                </div>
                            </div>
                            <hr class="dark horizontal my-0" />
                            <div class="card-footer p-3">
                                <p class="mb-0"><span class="text-success text-sm font-weight-bolder">Transaction complete</span></p>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-6 col-sm-6 mb-xl-0 mb-4 mt-3">
                        <div class="card">
                            <div class="card-header p-3 pt-2">
                                <div class="pt-1">
                                    <p class="text-sm mb-0 text-capitalize"><i class="fa-solid fa-sack-dollar mx-2 "></i>Income :</p>
                                    <h4 class="mb-0">Rp {formatNumber(this.state.income)}</h4>
                                </div>
                            </div>
                            <hr class="dark horizontal my-0" />
                            <div class="card-footer p-3">
                                <p class="mb-0"><span class="text-success text-sm font-weight-bolder">Latest income</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}