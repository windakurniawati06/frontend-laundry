import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer mt-3">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h2><i class="fa-solid fa-soap mx-1"></i>Timmy Laundry</h2>
            <h5 className="list-unstyled">
              <li>~ Your dirty clothes are our sustenance ~</li>
            </h5>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Service hours :</h4>
            <ui className="list-unstyled">
              <li>Senin - Kamis ( 07.00 AM - 08.00 PM )</li>
              <li>Jumat - Minggu ( 07.00 AM - 05.00 PM )</li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Contact Information :</h4>
            <ui className="list-unstyled">
              <li><i class="fa-solid fa-phone mx-2"></i>(0355) 3467 564</li>
              <li><i class="fa-brands fa-instagram mx-2"></i>timmy_laundry</li>
              <li><i class="fa-solid fa-location-dot mx-2"></i>Jl. Khr Abdul Fattah 4/1</li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;