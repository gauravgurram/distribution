"use client"
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/page";
import Header from "../Header/page";
import Sidebar from "../Sidebar/page";
import { useEffect, useState } from "react";
import { setTypeDistribution,fetchTypeDistribution,addTypeDistribution,deleteTypeDistribution,UpdateTypeDistributionId,UpdateTypeDistribution } from "../redux/typedistribution";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export default function TypeDistribution() {

  const { typeDistribution,typeName,type_id }  = useSelector((state) => state.typedistribution);

  const [modalOpen, setModalOpen] = React.useState(false);

  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchTypeDistribution())
  },[dispatch]);


    const data = {
        typeName:typeName,
    }

    const handleEdit=(id)=>{
      setModalOpen(!modalOpen)
      dispatch(UpdateTypeDistributionId(id))
    }

    const handleUpdate=()=>{
      const data={
        type_id:type_id,
        typeName:typeName,
      }
      dispatch(UpdateTypeDistribution(data))
    }


    const validateForm = () => {
      const errors = {};
  
      if (!typeName) {
        errors.typeName = 'Distribution type is required.';
      } else {
  
        const stringPattern = /^[A-Za-z\s]+$/;
        if (!stringPattern.test(typeName)) {
          errors.typeName = 'Distribution typemust contain only string characters.';
        } else if (typeName.length < 3) {
          errors.typeName = 'Distribution type must be at least 3 characters.';
        }
      }
  
  
      setFormErrors(errors);
  
      return Object.keys(errors).length === 0;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (validateForm()) {
        dispatch(addTypeDistribution(data));
      }
    };

    return (
    <>
  <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <Sidebar/>
    <div class="body-wrapper">
      <Header/>
     
      <div class="container-fluid">
        <div class="container-fluid">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title fw-semibold mb-4">Add Type Of Distribution</h5>

              <div class="card">
              <div class="card-body">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Distribution Type</label>
                  <input type="text" class={`form-control ${formErrors.typeName ? "is-invalid" : ""}`} id="exampleInputtext1"
                    onChange={(e)=>dispatch(setTypeDistribution(e.target.value))} aria-describedby="textHelp" required />
                  {formErrors.typeName && <div className="invalid-feedback">{formErrors.typeName}</div>}
                </div>
                <button type="submit" onClick={handleSubmit} class="btn btn-primary">Add</button>
                </div>
              </div>

        <div class="container-fluid">
          <div class="card">
            <div class="card-body">
            <h5 class="card-title fw-semibold mb-4">List Of Distribution Type</h5>
            <br/>
            <div class="col-lg-12 d-flex align-items-stretch">
            <div class="card w-100">
              <div class="card-body p-4">
                <div class="table-responsive">
                  <table class="table text-nowrap mb-0 align-middle text-center table-bordered">
                    <thead class="text-dark fs-4 ">
                      <tr>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Id</h6>
                        </th>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Type Of Distribution</h6>
                        </th>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Update</h6>
                        </th>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Delete</h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      {typeDistribution && typeDistribution.map((client)=>(
                      <tr key={client.id}>
                        <td class="border-bottom-0"><h6 class="fw-semibold mb-0">{client.id}</h6></td>
                        <td class="border-bottom-0">
                            <h6 class="fw-semibold mb-1">{client.type_distribution}</h6>
                        </td>
                        <td class="border-bottom-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square text-warning" viewBox="0 0 16 16" onClick={()=>handleEdit(client.id)}>
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        </td>
                        <td class="border-bottom-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash text-danger" viewBox="0 0 16 16" onClick={()=>dispatch(deleteTypeDistribution(client.id))}>
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg>                        
                        </td>
                      </tr> 
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>

    <>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Update Truck Category Details
          </h5>
          <Button
            aria-label="Close"
            className=" close"
            type="button"
            color="danger"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <span aria-hidden={true}>X</span>
          </Button>
        </div>

        <ModalBody>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Distribution Type</label>
              <input type="text" class="form-control" Value={typeName} id="exampleInputEmail1" onChange={(e)=>dispatch(setTypeDistribution(e.target.value))} aria-describedby="emailHelp"/>
            </div>
        </ModalBody>

        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </Button>
          <Button color="primary" type="button" onClick={handleUpdate}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </>


            </div>
          </div>
        </div>
        <div class="py-6 px-6 text-center">
          <p class="mb-0 fs-4">Design and Developed by <a href="https://themewagon.com">Team Ingenious</a></p>
        </div>
      </div>
      </div>
    </div>
    <Footer/>
</>
    )
  }
  