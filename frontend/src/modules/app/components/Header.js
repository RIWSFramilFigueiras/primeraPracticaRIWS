import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as selectors from "../../user/selectors";
import { useDispatch } from 'react-redux';
import * as userActions from '../../user/actions';

const Header = () => {

  const userName = useSelector(selectors.getUserName);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link className="navbar-brand" to="/"><FormattedMessage id='app.Header.Title'/></Link>
          <Nav className="me-auto center">
            <Link className="nav-link" to="/grandes-premios">
              <FormattedMessage id={'formuladata.grandesPremios.nombre'}/>
            </Link>
            <Link className="nav-link" to="/vueltas-rapidas">
              <FormattedMessage id={'formuladata.fastestLaps.nombre'}/>
            </Link>
          </Nav>

          <Nav className="me-auto">
          </Nav>

          {
            userName ?

              <NavDropdown title={userName} id="basic-nav-dropdown">

                <Link className="dropdown-item" to={`/users/${userName}`}>
                  <FormattedMessage id="app.Header.MyProfile" />
                </Link>
                <Link className="dropdown-item" to={`/users/${userName}/changue-data`}>
                  <FormattedMessage id='user.Profile.EditData' />
                </Link>
                <Link className="dropdown-item" to={`/users/${userName}/changue-password`}>
                  <FormattedMessage id='user.Profile.ChanguePassword' />
                </Link>
                <NavDropdown.Divider />
                <Link className="dropdown-item" onClick={() => dispatch(userActions.logout())} to="/">
                  <FormattedMessage id="app.Header.LogOut" />
                </Link>
              </NavDropdown>

              :

              <NavDropdown title={<FormattedMessage id="app.Header.Profile" />} id="basic-nav-dropdown">

                <Link className="dropdown-item" to="/users/logIn">
                  <FormattedMessage id="app.Header.LogIn" />
                </Link>
                <Link className="dropdown-item" to="/users/signUp">
                  <FormattedMessage id="app.Header.SignIn" />
                </Link>
              </NavDropdown>

          }

        </Container>
      </Navbar>
    </div>
  );
}

export default withRouter(Header);