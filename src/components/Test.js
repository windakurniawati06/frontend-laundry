import React from "react" //syarat wajib untuk membuat file baru
import reactDom from "react-dom";

class Test extends React.Component{
    render(){ //fungsi render menampilkan elemen yang dibuat
        return (
            <div className={`alert alert-${this.props.bgColor}`}>
                {this.props.label} <br  />
                <button className={`btn btn-${this.props.btnColor}`}>
                {this.props.btnLabel}
                </button>
            </div>
        )
    }
}

export default Test