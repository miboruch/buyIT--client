import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { updateCategory } from '../../../actions/productAction';
import Spinner from '../../atoms/Spinner/Spinner';
import Button from '../../atoms/Button/Button';

const StyledWrapper = styled.div`
  width: 90%;
  min-height: 100vh;
  margin: auto;
  overflow: hidden;
  padding-bottom: 4rem;
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: lighter;
  font-size: 40px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin: 3rem 0;
  display: flex;
  justify-content: flex-end;
`;

const StyledHeading = styled.h1`
  width: 90%;
  margin: auto;
  text-align: center;
  font-family: ${({ theme }) => theme.font.family.futura};
  letter-spacing: 2px;
  font-weight: lighter;
  font-size: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ProductResultTemplate = ({
  children,
  category,
  products,
  match,
  updateCategory,
  isLoggedIn
}) => {
  // useEffect(() => {
  //   updateCategory(match.params.category);
  // }, [match]);
  return (
    <StyledWrapper>
      <ButtonWrapper>
        <Button text={isLoggedIn ? 'add new product' : 'log in'} />
      </ButtonWrapper>
      {products.length !== 0 ? (
        <>
          <StyledParagraph>shop/{category}</StyledParagraph>
          {children}
        </>
      ) : (
        <StyledHeading>Products not found</StyledHeading>
      )}
    </StyledWrapper>
  );
};

const mapStateToProps = ({
  productReducer: { category, products },
  authenticationReducer: { isLoggedIn, token }
}) => {
  return { category, products, isLoggedIn, token };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCategory: category => dispatch(updateCategory(category))
  };
};

ProductResultTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  category: PropTypes.string,
  products: PropTypes.array,
  match: PropTypes.object,
  updateCategory: PropTypes.func,
  isLoggedIn: PropTypes.bool
};

const ProductResultTemplateWithRouter = withRouter(ProductResultTemplate);

export default connect(mapStateToProps, mapDispatchToProps)(ProductResultTemplateWithRouter);