// Main page component

import React, { Component } from 'react';

const Study = props => {
  return (
    <tr key={props.study.studyID}>
      <td>{props.study.difficulty}</td>
      <td><img src={props.study.studyPath} alt="Giuliani Study"></img></td>
    </tr>
  )
}

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studyDifficultyLevel: '2',
      studyResultLimit: '2',
      studyNoDifficulty: false,
      studies: []
    }

    this.onChangeStudyDifficultyLevel = this.onChangeStudyDifficultyLevel.bind(this);
    this.onChangeStudyResultLimit = this.onChangeStudyResultLimit.bind(this);
    this.onChangeStudyNoDifficulty = this.onChangeStudyNoDifficulty.bind(this);
    this.fetchStudiesByDifficulty = this.fetchStudiesByDifficulty.bind(this);
    this.fetchAllStudies = this.fetchAllStudies.bind(this);
    this.studyList = this.studyList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeStudyDifficultyLevel(e) {
    this.setState({
      studyDifficultyLevel: e.target.value
    })
  }

  onChangeStudyResultLimit(e) {
    this.setState({
      studyResultLimit: e.target.value
    })
  }

  onChangeStudyNoDifficulty(e) {
    this.setState({
      studyNoDifficulty: e.target.value
    })
  }

  fetchStudiesByDifficulty() {
    fetch('https://giuliani-helper-server.herokuapp.com/get-randomized-studies-by-difficulty?' + 
        new URLSearchParams({
        difficulty: this.state.studyDifficultyLevel,
        limit: this.state.studyResultLimit
      }), {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
    })
    .then( res => {
      return res.json()
    })
    .then( data => {
      this.setState({ studies: data })
    })
    .catch( (error) => {
      console.log(error);
    })
  }

  fetchAllStudies() {
    fetch('https://giuliani-helper-server.herokuapp.com/get-randomized-studies-all?' + 
        new URLSearchParams({
        limit: this.state.studyResultLimit
      }), {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
    })
    .then( res => {
      return res.json()
    })
    .then ( data => {
      this.setState({ studies: data })
    })
    .catch( (error) => {
      console.log(error);
    })
  }

  onSubmit(e) {
    e.preventDefault();

    if(this.state.studyResultLimit === '') return; 

    if( this.state.studyNoDifficulty === 'on' ) {
      this.fetchAllStudies()
    } else {
      if (this.state.studyDifficultyLevel === '') {
        return;
      }
      this.fetchStudiesByDifficulty();
    }
    
    // reset state for 'no difficulty level' checkbox
    this.setState({
      studyNoDifficulty: false
    })
  }

  studyList() {
    if(this.state.studies) {
      return this.state.studies.map( (currentStudy, i ) => {
        return ( <Study study={currentStudy} studyID={i.toString()} /> )
      })
    } else {
      return null; 
    }
  }

  render() {
    let difficultyLevel = parseInt(this.state.studyDifficultyLevel);
    let difficultyLevelInvalid = this.state.studyDifficultyLevel === "" 
      || difficultyLevel < 1 || difficultyLevel > 7;
    let difficultyLevelClass = "";
    if (difficultyLevelInvalid) { difficultyLevelClass = "is-invalid" }

    let numStudies = parseInt(this.state.studyResultLimit);
    let numStudiesInvalid = this.state.studyResultLimit === "" 
      || numStudies < 1 || numStudies > 10;
    let numStudiesClass = "";
    if (numStudiesInvalid) { numStudiesClass = "is-invalid" }

    return (
      <div style={{marginTop: 10}}>
         <h5>Query 120 Giuliani Studies</h5>
         <h6>Results are randomized. </h6>
         <br></br>

        <form onSubmit={this.onSubmit}>     
          <div className="form-group">
            <label>Enter Difficulty Level (1-7)</label>
              <input type="number"
                className={ "form-control " + difficultyLevelClass }
                value={this.state.studyDifficultyLevel}
                onChange={this.onChangeStudyDifficultyLevel}
              />
          </div>

          <div className="form-group">
            <label>Or No Difficulty Level:</label>
            <input
              name="noDifficultyLevel"
              type="checkbox"
              checked={this.state.studyNoDifficulty }
              onChange={this.onChangeStudyNoDifficulty}
            />
          </div>

          <div className="form-group">
            <label>Limit results (1-10)</label>
            <input type="number"       
              className={"form-control " + numStudiesClass} 
              value={this.state.studyResultLimit}
              onChange={this.onChangeStudyResultLimit}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form> 

        <div>
          <h5>Results: </h5>
          <table className="table" style={{ marginTop: 20 }} >
            <thead>
             <tr>
                <th>Level</th>             
                <th>Study</th>
             </tr>
            </thead>
            <tbody>
             { this.studyList() }
            </tbody>
          </table>
        </div>

      </div>  
    )
  }
}