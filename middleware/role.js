const Roles = {
    ADMIN: "ADMIN",
    USER: "USER",
};

const inRole = 
(... roles) => 
(req, res, next) => {
const exist = roles.find((role) => role === req.user.role);
    if(!exist){
    return res.status(403).send({message: "not allowed"});
}
next();
};


module.exports.roleMiddleware= {
    Roles,
    inRole,
};