import React, { useState } from "react";
import { storage } from "../Firebase/FirebaseConfig";
import "./InputFile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ref, uploadBytes, updateMetadata } from "firebase/storage";
import Swal from "sweetalert2";
import { Button, Card, Form } from "react-bootstrap";
import Compressor from "compressorjs";

const InputFile = () => {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedTags, setSelectedTags] = useState("");

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files;
    console.log(selectedFile);
    const compressedImages = [];

    for (let i = 0; i < selectedFile.length; i++) {
      const fileImage = selectedFile[i];
      try {
        await new Promise((resolve, reject) => {
          //Comprimo la imagen que se va a renderizar en las cards
          new Compressor(fileImage, {
            quality: 0.4,
            maxHeight: 900,
            maxWidth: 900,
            success: (compressedFile) => {
              compressedImages.push(compressedFile);
              resolve();
            },
            error: (error) => {
              reject(error);
            },
          });
        });
      } catch (error) {
        console.error(error);
        alert("Error al comprimir la imagen");
      }
    }

    setFile(selectedFile);
    setSelectedImage(compressedImages);
  };

  const handleTagChange = (e) => {
    setSelectedTags(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Recorro cada imagen seleccionada
      for (let i = 0; i < file.length; i++) {
        const selectedFile = file[i];
        const reader = new FileReader();

        reader.onloadend = async () => {
          // Comprimo la imagen que voy a enviar al storage
          new Compressor(selectedFile, {
            quality: 0.5, //La comprimo al 50%
            maxHeight: 900,
            maxWidth: 900,
            success: async (compressedFile) => {
              const fileData = new Blob([compressedFile], {
                type: compressedFile.type,
              });
              const storageRef = ref(storage, selectedFile.name); // Utilizo el nombre del archivo como referencia en el storage

              await uploadBytes(storageRef, fileData);
              //Agrego la etiqueta
              await updateMetadata(storageRef, {
                customMetadata: { tag: selectedTags },
              });

              console.log("Imagen subida con éxito");

              setTimeout(() => {
                setSelectedImage("");
              }, 3000);
            },
            error: (error) => {
              console.log(error);
              alert("Error al comprimir la imagen");
            },
          });
        };

        reader.readAsArrayBuffer(selectedFile);
      }

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Imágenes subidas con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      alert("Error al subir las imágenes");
    }
  };

  return (
    <div className="containerForm">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label className="label">Seleccionar imagenes</Form.Label>
          <Form.Control
            type="file"
            size="lg"
            onChange={handleFileChange}
            multiple
          />
        </Form.Group>

        <Form.Group controlId="formTags" className="formCheck">
          <Form.Label className="labelCheck">
            Por favor, seleccionar a que equipo corresponden las imagenes
          </Form.Label>
          <div className="divCheck">
            <Form.Check
              type="checkbox"
              label="Etiqueta 1"
              id="tag1"
              value="etiqueta1"
              checked={selectedTags === "etiqueta1"}
              onChange={handleTagChange}
              className="check"
            />
            <Form.Check
              type="checkbox"
              label="Etiqueta 2"
              id="tag2"
              value="etiqueta2"
              checked={selectedTags === "etiqueta2"}
              onChange={handleTagChange}
              className="check"
            />
            <Form.Check
              type="checkbox"
              label="Etiqueta 3"
              id="tag3"
              value="etiqueta3"
              checked={selectedTags === "etiqueta3"}
              onChange={handleTagChange}
              className="check"
            />
          </div>
        </Form.Group>

        <Button variant="outline-light" className="button" type="submit">
          Subir
        </Button>
      </Form>

      <div className="gallery">
        {selectedImage.length > 0 && (
          <div className="image-gallery">
            {selectedImage.map((image, index) => (
              <Card key={index}>
                <Card.Img variant="top" src={URL.createObjectURL(image)} />
                <Card.Body>
                  <Card.Title>{image.name}</Card.Title>
                  <Card.Text>
                    {image.type} - {image.size} bytes
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputFile;
