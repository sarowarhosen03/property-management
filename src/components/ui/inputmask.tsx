import { forwardRef } from "react";

const InputMask = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default InputMask;
