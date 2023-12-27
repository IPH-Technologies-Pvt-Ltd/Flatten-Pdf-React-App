import React, { useRef, useState } from "react";
import { saveAs } from 'file-saver';
const Pdf = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [processingMessage, setProcessingMessage] = useState("Processing your PDF, please wait...");

  const handleFileInputChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSelectedFile(selectedFile);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      setSelectedFile(droppedFiles[0]);
    }
  };
  const handleDownload = () => {
    if (generatedPdf) {
      // Convert the PDF to a Blob
      const pdfBlob = generatedPdf.output('blob');
      // Use FileSaver.js to trigger the download
      saveAs(pdfBlob, 'FlattenedPDF.pdf');
    }
    setShowModal(false);
    setCurrentPage(1); // Reset current page to the first page
  };
  const handleSelectPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleFlattenPdf = async () => {
    setShowModal(true);
    if (!selectedFile) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function () {
      const typedArray = new Uint8Array(reader.result);
      window.pdfjsLib
        .getDocument(typedArray)
        .promise.then(async function (pdf) {
          const numPages = pdf.numPages;
          const imageDataArray = [];
          // Convert each page to image
          for (let i = 1; i <= numPages; i++) {
            const imageData = await convertPageToImage(pdf, i);
            imageDataArray.push(imageData);
            console.log("Image Data Array Length:", imageDataArray.length);
            console.log("Image Data Created:", imageData); // Now it should log the resolved image data
          }
          // Generate PDF from images after all pages are converted
          const doc = createPdfFromImages(imageDataArray);
          // Save the final PDF
          setGeneratedPdf(doc); // Store the generated PDF in state

          // doc.save("FlattenedPDF.pdf");
            // Update processing message for download
            setProcessingMessage("PDF processed successfully! Click 'Download' to save.");

        });
    };
    reader.readAsArrayBuffer(selectedFile);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  async function convertPageToImage(pdf, pageNumber) {
    return new Promise((resolve) => {
      pdf.getPage(pageNumber).then((page) => {
        const canvas = document.createElement("canvas");
        const viewPort = page.getViewport({ scale: 1 });
        canvas.width = viewPort.width;
        canvas.height = viewPort.height;
        const ctx = canvas.getContext("2d");

        const renderContext = {
          canvasContext: ctx,
          viewport: viewPort,
        };

        page.render(renderContext).promise.then(() => {
          const imageData = canvas.toDataURL("image/jpeg", 1.0);
          resolve(imageData);
        });
      });
    });
  }
  const createPdfFromImages = (imageDataArray) => {
    // eslint-disable-next-line no-undef
    const doc = new jsPDF("p", "mm", "a4");
    const margin = 10;

    imageDataArray.forEach((imageData, index) => {
      if (index > 0) {
        doc.addPage();
      }
      console.log("Adding Image to PDF:", imageData);

      doc.addImage(
        imageData,
        "JPEG",
        margin,
        margin,
        doc.internal.pageSize.width - 2 * margin,
        doc.internal.pageSize.height - 2 * margin,
        undefined,
        "FAST",
        0.9
      );
    });
    return doc;
  };
  return (
    <>
      {selectedFile ? (
        <>
          {/* Render selected file details and conversion options */}
          <div className="container text-center fw-semibold">
            <p>Selected: {selectedFile?.name}</p>
            <div>
              <p>Choose an option: </p>
              <div className="d-flex justify-content-center div-btn mb-5">
                <div className="px-2 border">Flatten everything</div>
                <div className="border px-2">Flatten only from fields</div>
              </div>
            </div>
            <div className="d-flex text-center justify-content-center">
              <button
                className="pdf-btn rounded me-2"
                onClick={handleFlattenPdf}
              >
                Flatten PDF
              </button>
              <button className="option-btn rounded"> More options</button>
            </div>
            {/* modal code */}

            <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="processingModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="processingModal">
                Processing PDF
              </h5>
              <button
                type="button"
                className="close pdf-btn rounded"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body fw-semibold">
            <h5>{processingMessage}</h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="pdf-btn rounded bg-danger"
                data-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="pdf-btn rounded"
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div> *
          </div>
        </>
      ) : (
        <>
          {/* Render file input and drag & drop area */}
          <div className="main-pdf-body pt-2 pb-4 mt-5">
            <div
              className="container"
              style={{
                border: "3px dotted #ccc",
                padding: "20px",
                marginTop: "20px",
              }}
            >
              <div className="mb-3 text-center">
                <label htmlFor="fileInput" className="form-label"></label>
                <label
                  className=" fw-bolder btn btn-outline-primary rounded-pill"
                  htmlFor="fileInput"
                  style={{
                    padding: "0.7rem 1.4rem",
                    width: "200px",
                    border: "1px solid #0b8",
                  }}
                >
                  Choose File
                  <input
                    type="file"
                    id="fileInput"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              <div
                className="border d-flex align-items-center justify-content-center"
                style={{ height: "200px", cursor: "pointer" }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <p className="text-center">Drag & Drop your PDF file here</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Pdf;


