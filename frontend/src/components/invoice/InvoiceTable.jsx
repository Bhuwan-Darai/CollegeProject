// import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

const InvoiceTable = ({ invoice }) => {
  const feeStructure = invoice && invoice.feeStructure;

  return (
    <Table>
      <thead>
        <tr>
          <th>Particulars</th>
          <th>Amount</th>
          <th>Total </th>
        </tr>
      </thead>
      <tbody>
        {feeStructure ? (
          <tr>
            <td>
              <ol>
                <li>Admission Fee</li>
                <li>Tuition Fee</li>
                <li>Internal Exam Fee</li>
                <li>Board Exam Fee</li>
                <li>Infrastructure Development Fee</li>
                <li>Library Fee</li>
                <li>Lab Fee</li>
                <li>Identity Card Fee</li>
              </ol>
            </td>
            <td>
              <ul style={{ listStyle: "none" }}>
                <li>{feeStructure.admissionFee}</li>
                <li>{feeStructure.tutionFee}</li>
                <li>{feeStructure.internalExamFee}</li>
                <li>{feeStructure.boardExamFee}</li>
                <li>{feeStructure.infrastructureDevelopmentFee}</li>
                <li>{feeStructure.libraryFee}</li>
                <li>{feeStructure.labFee}</li>
                <li>{feeStructure.identityCardFee}</li>
              </ul>
            </td>
            <tr>
              <td>{feeStructure.totalFee} </td>
            </tr>
          </tr>
        ) : (
          <tr>
            <td colSpan="2">No fee data available.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

// InvoiceTable.propTypes = {
//   invoices: PropTypes.shape({
//     feeStructure: PropTypes.shape({
//       admissionFee: PropTypes.number,
//       tuitionFee: PropTypes.number,
//       internalExamFee: PropTypes.number,
//       boardExamFee: PropTypes.number,
//       infrastructureDevelopmentFee: PropTypes.number,
//       libraryFee: PropTypes.number,
//       labFee: PropTypes.number,
//       identityCardFee: PropTypes.number,
//     }),
//   }),
// };

export default InvoiceTable;
