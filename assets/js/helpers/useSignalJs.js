const useSignalJs = (value) => {
  
  return {
    get current() {
      return value;
    },

    set current(newValue) {
      value = newValue;

      if (typeof this.onHandlerChangeValue === "function") {
        this.onHandlerChangeValue(newValue);
      }
    },

    /**
     * @param {any} newValue
     */
    set __current__ (newValue) {
      value = newValue;
    },

    onHandlerChangeValue: ""
  };
};

export default useSignalJs;
