const newParamOutputs = (param, outputs) => {
    if (!param)
        return '';
    Object.keys(outputs).forEach(key => {
        param = param.toString().split(`@${key}`).join(outputs[key]);
    });
    return param;
};

module.exports = {newParamOutputs};
