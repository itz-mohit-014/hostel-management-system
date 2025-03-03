
import { useState, InputHTMLAttributes, ReactNode, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  icon?: ReactNode;
}

const FormInput = ({ label, id, type = "text", error, icon, ...props }: FormInputProps) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const inputRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordType = type === "password";
  const effectiveType = isPasswordType && showPassword ? "text" : type;

  // console.log(focused )

  // useEffect(() => {
  //   if (inputRef.current) {
  //     //@ts-ignore
  //     inputRef.current.onblur = (e) => {
  //       setFocused(e.target.value ? true : false);
  //     };
  //   }
  // }, [])

  return (
    <div className="space-y-2">
      <div
        className={`relative group rounded-md border ${
          error 
            ? "border-destructive" 
            : focused 
              ? "border-primary" 
              : "border-input"
        } transition-all duration-200 ease-in-out`}
      >
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50 group-focus-within:text-primary">
            {icon}
          </div>
        )}
        
        <input
          id={id}
          type={effectiveType}
          className={`block w-full bg-transparent rounded-md border-0 py-2 ${
            icon ? "pl-10" : "pl-4"
          } ${isPasswordType ? "pr-12" : "pr-4"} text-foreground placeholder:text-transparent focus:ring-0 focus:outline-none`}
          placeholder={label}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(e.target.value ? true : false);
          }}
          // ref={inputRef}
          {...props}
        />
        
        <label
          htmlFor={id}
          className={`absolute left-0 ${
            icon ? "left-10" : "left-4"
          } top-1/2 -translate-y-1/2 pointer-events-none text-foreground/50 transition-all duration-200 ease-in-out ${
            focused
              ? `-translate-y-[170%] bg-[#fcfcfc] dark:bg-[#111112] -ml-2 px-2 text-xs font-medium ${
                  error ? "text-destructive" : "text-primary"
                }`
              : ""
          }`}
        >
          {label}
        </label>
        
        {isPasswordType && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-destructive text-xs">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
