import React from 'react';
import { Link } from 'react-router-dom';

export default ({id, nome, curso, capacidade}) => {
  return (
    <tr>
      <td style={{textAlign: 'center'}}>{id}</td>
      <td>{nome}</td>
      <td style={{textAlign: 'center'}}>{curso}</td>
      <td style={{textAlign: 'center'}}>{capacidade}</td>
      <td style={{textAlign: 'center'}}><Link to={`/edit/${id}`}>Editar</Link></td>
      <td style={{textAlign: 'center'}}><Link to={`/delete/${id}`}>Excluir</Link></td>
    </tr>
  );
}