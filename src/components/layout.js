import { useCallback, useState } from "react";
import Button from "./button";
import './layout.css'

const Layout = () => {
  const [count, setCount] = useState(0);
  const onButtonClick = useCallback(() => {
    setCount(count + 1);
  }, [count])

  return (
    <>
      <section className="hero">
      </section>
      <main className="layout"
        style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: "center", marginTop: 50 }}>
        <h1>Webpack-5 with Babel and ReactJS</h1>
        <Button className="counter-button" onClick={onButtonClick} css={{ padding: 10 }}>
          Click to Increment by 1</Button>
        <h2>{count}</h2>
      </main>
    </>
  )
}

export default Layout;
