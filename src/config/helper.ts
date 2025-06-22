import { UserRole } from "../domain/entities/userentity";


export  const getRoleFirstletter=(role:UserRole)=>{

    switch (role) {
        case "SUPER_ADMIN":
            return "SA";
            
        case "ADMIN":
            return "A";
            
        case "UNIT_MANAGER":
            return "UM";
            
        case "USER":
            return "U";
            
            
    
        default:
            return "X";
    }


    
}