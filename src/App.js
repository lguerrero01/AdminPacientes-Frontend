import React,{useEffect,useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Pacientes from './components/Pacientes';
import NuevaCita from './components/nuevaCita';
import Cita from './components/cita';

import clienteAxios from './config/axios';

function App() {

  const [citas, guardarCitas] = useState([]);
  const [consulta, guardarConsulta] = useState(true);

  useEffect(() => {
    
        if (consulta) {
          const consultarAPI = () => {
            clienteAxios.get('/pacientes')
            .then(res =>{
              //colocar en el state el resultado
              guardarCitas(res.data);

              //deshabilitar la consulta
              guardarConsulta(false);
            })
            .catch(error => {
              console.log(error);
            })
          }

          consultarAPI();
      }
  }, [consulta]);

  return (
    <Router>
      <Switch>
        <Route
          exact path ="/"
          component={() => <Pacientes citas={citas}  />}
        />
         <Route
          exact path ="/nueva"
          component={() => <NuevaCita  guardarConsulta={guardarConsulta} />}
        />
         <Route
          exact path ="/cita/:id"
          render={(props) => {
            const cita = citas.filter( cita => cita._id === props.match.params.id);
            console.log('linea 50',cita)
            return(
              <Cita
                cita={cita}
              />
            )
          }}        
        />
  
      </Switch>
    </Router>
  );
}

export default App;
