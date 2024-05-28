const Roles = {
    ADMIN: "admin",
    USER: "user",
};

const inRole = 
(... roles) => 
(req, res, next) => {
const exist = roles.find((role) => role === req.user.__t);
    if(!exist){
    return res.status(403).send({message: "not allowed"});
}
next();
};


module.exports.roleMiddleware= {
    Roles,
    inRole,
};