import React from 'react';
import { Link } from 'react-router-dom';

export default ({id, nome, curso, capacidade, verified}) => {
  return (
    <tr>
      <td style={{textAlign: 'center'}}>{id}</td>
      <td>{nome}</td>
      <td style={{textAlign: 'center'}}>{curso}</td>
      <td style={{textAlign: 'center'}}>{capacidade}</td>
      {verified?
        <>
          <td style={{textAlign: 'center'}}><Link to={`/edit/${id}`}>Editar</Link></td>
          <td style={{textAlign: 'center'}}><Link to={`/delete/${id}`}>Excluir</Link></td>
        </>:
        <td colSpan={2} className="alert alert-warning" style={{textAlign:'center'}}>Verifique seu email!</td>}
    </tr>
  );
}