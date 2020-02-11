import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FormLine from '../../molecules/FormLine/FormLine';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '../../atoms/Button/Button';
import { userUpdate } from '../../../actions/authenticationAction';
import { UpdateSchema } from '../../../utils/schemaValidation';
import { updateInputArrays } from '../../../utils/contentArrays';
import { countries } from 'countries-list';
import CountrySelectMenu from '../../atoms/CountrySelectMenu/CountrySelectMenu';

const countriesArray = Object.values(countries).map(item => item.name);

const StyledForm = styled(Form)`
  width: 90%;
  transition: 1s ease all;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 40px;
  background: transparent;
  border: none;
  border-bottom: ${({ colorTheme }) =>
    colorTheme === 'dark' ? '1px solid #fff' : '1px solid #000'};
  font-family: ${({ theme }) => theme.font.family.futura};
  font-size: 16px;
  color: ${({ colorTheme }) => (colorTheme === 'dark' ? '#fff' : '#000')};
  margin-bottom: 3rem;
`;

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.font.family.futura};
  color: rgba(0, 0, 0, 0.7);
  font-size: 13px;
`;

const EditTemplate = ({ userInfo, userUpdate, token, history }) => {
  return (
    <Formik
      initialValues={{
        name: userInfo.name,
        lastName: userInfo.lastName,
        address: userInfo.address,
        city: userInfo.city,
        country: userInfo.country
      }}
      onSubmit={({ name, lastName, address, city, country }) => {
        userUpdate(name, lastName, city, address, country, token);
        history.push('/my-account');
      }}
      validationSchema={UpdateSchema}
    >
      {({ handleChange, handleBlur, errors, values, setEditOpen }) => {
        const updateInput = updateInputArrays(errors, values);
        return (
          <StyledForm>
            {updateInput.map(item => (
              <FormLine
                key={item.name}
                labelText={item.labelText}
                onChange={handleChange}
                onBlur={handleBlur}
                inputType='text'
                name={item.name}
                colorTheme='light'
                value={item.value}
              />
            ))}
            <CountrySelectMenu handleChange={handleChange} formFieldName='country' />
            <Button buttonTheme='dark' text='Save' type='submit' />
          </StyledForm>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = ({ authenticationReducer: { userInfo, token } }) => {
  return { userInfo, token };
};

const mapDispatchToProps = dispatch => {
  return {
    userUpdate: (name, lastName, city, address, country, token) =>
      dispatch(userUpdate(name, lastName, city, address, country, token))
  };
};

EditTemplate.propTypes = {
  userInfo: PropTypes.object,
  userUpdate: PropTypes.func,
  token: PropTypes.string
};

const EditTemplateWithRouter = withRouter(EditTemplate);

export default connect(mapStateToProps, mapDispatchToProps)(EditTemplateWithRouter);
