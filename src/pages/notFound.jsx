const NotFound = () => {
    return (
       <section className="notfound-container">
    <i className="fas fa-exclamation-triangle icon"></i>
    <h1 className="NotFound-title">404 Not Found</h1>
    <p className="NotFoundmessage">This page does not exist</p>
    <a href="/" className="btn">Go Back</a>
  </section>
    );
}
export default NotFound 