import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {

  constructor(props){
    super(props);
    this.state = {nome: '', curso: '', capacidade: 0};

    this.setData = this.setData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setData(e) {
    const data = e.target;
    if (data.name === 'nome')
      this.setState({nome: data.value});
    else if (data.name === 'curso')
      this.setState({curso: data.value});
    else if (data.name === 'capacidade')
      this.setState({capacidade: data.value});
    else console.error("Campo não encontrado!");

  }

  async onSubmit(e) {
    e.preventDefault();
    try {
      const disciplina = {...this.state};
      const res = await axios.post('http://localhost:3001/disciplinas', disciplina);
      console.info(res);
    } catch (e) {
      console.error(e.message);
    } finally {
      this.setState({nome: '', curso: '', capacidade: 0});
    }
  }

  render() {
    return (
      <div>
        <h3>Criar Disciplina</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="dNome">Nome:</label>
            <input id="dNome" className="form-control" name="nome"
              value={this.state.nome} onChange={this.setData}/>
          </div>
          <div className="form-group">
            <label htmlFor="dCurso">Curso:</label>
            <input id="dCurso" className="form-control" name="curso"
              value={this.state.curso} onChange={this.setData}/>
          </div>
          <div className="form-group">
            <label htmlFor="dCap">Capacidade:</label>
            <input id="dCap" type="number" min="0" step="1" name="capacidade"
              className="form-control" value={this.state.capacidade}
              onChange={this.setData}/>
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Criar"/>
          </div>
        </form>
      </div>
    );
  }
}
