function SomethingWentWrongComponent({
  onRetry,
}) {

  return (

    <section className="state-card">

      <div className="state-icon">
        !
      </div>

      <h2>
        Oops! Something went wrong
      </h2>

      <p>
        We couldn't fetch the books.
        Please try again.
      </p>

      <button
        className="primary-button"
        onClick={onRetry}
      >
        ↻ Try Again
      </button>

    </section>

  )
}

export default SomethingWentWrongComponent