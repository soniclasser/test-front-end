import React, { useState, useEffect } from 'react';
import api from '../axios'; 
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Invoices = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [invoiceData, setInvoiceData] = useState([]); 
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Por favor, selecciona un archivo XML primero');
      return;
    }

    const formData = new FormData();
    formData.append('xml', file); // Adjuntar el archivo

    try {
      setLoading(true);
      await api.post('/invoices', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        title: '¡Factura cargada!',
        text: 'El archivo XML ha sido cargado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      setFile(null);

      fetchInvoices();

    } catch (error) {
      console.log(error.response.data.descripcionError)
      setError(error.response.data.descripcionError);
      toast.error(error.response.data.descripcionError);
      
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/xml') {
      setFile(selectedFile); 
      setError(null); 
    } else {
      toast.error('Por favor, sube un archivo XML válido');
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await api.get('/invoices'); 
      setInvoiceData(response.data); 
    } catch (error) {
      setError('Error al obtener las facturas');
      toast.error('Error al obtener las facturas');
    }
  };

  // Llamar a `fetchInvoices` al cargar el componente para obtener las facturas
  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="invoices">
      <h1>Gestión de Facturas</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleFileUpload}>
        <input
          type="file"
          accept=".xml"
          onChange={handleFileChange}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !file}>
          {loading ? 'Cargando...' : 'Subir XML'}
        </button>
      </form>

      {invoiceData.length > 0 && (
        <div>
          <h3>Listado de Facturas</h3>
          <table>
            <thead>
              <tr>
                <th>UUID</th>
                <th>Folio</th>
                <th>Emisor</th>
                <th>Receptor</th>
                <th>Moneda</th>
                <th>Total</th>
                <th>Tipo de Cambio</th>
                <th>Fecha de Creación</th>
                <th>Fecha de Actualización</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.map((invoice, index) => (
                <tr key={index}>
                  <td>{invoice.uuid || 'N/A'}</td>
                  <td>{invoice.folio || 'N/A'}</td>
                  <td>{invoice.emisor || 'N/A'}</td>
                  <td>{invoice.receptor || 'N/A'}</td>
                  <td>{invoice.moneda || 'N/A'}</td>
                  <td>{invoice.total || '0.00'}</td>
                  <td>{invoice.tipo_cambio || 'N/A'}</td>
                  <td>{new Date(invoice.created_at).toLocaleString()}</td>
                  <td>{new Date(invoice.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Invoices;
