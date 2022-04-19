const Menus = require("../models/Menus");
const Response = require("../utils/Response");
const Messages = require("../utils/Messages");

const getMenusTree = (menus) => {
  const menutree = [];
  // make tree of menus based on parent_id
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].parent_id == 0) {
      menutree.push(menus[i]);
    } else {
      if (menus.parent_id != 0) {
        let treeIndex;
        menutree.find((el, index) => {
          treeIndex = index;
          return el.id == menus[i].parent_id;
        });
        if (menutree[treeIndex]?.hasOwnProperty("children")) {
          menutree[treeIndex].children.push(menus[i]);
        } else {
          menutree[treeIndex] = {
            ...menutree[treeIndex],
            children: [menus[i]],
          };
        }
      }
    }
  }
  return menutree;
};


// Get tree
exports.index = async (req, res) => {
  try {
    const all = await Menus.getAll();

    let menus = getMenusTree(all);

    if (!menus) {
      return Response(res)(null, { message: Messages.notFound });
    }
    return Response(res)(null, { menus });
  } catch (error) {
    console.log(error);
    return Response(res)(error, null);
  }
};


// Get list
exports.list = async (req, res) => {
  try {
    let menus = await Menus.getAll();

    menus = menus.filter(menu => menu.slug === null)

    if (!menus) {
      return Response(res)(null, { message: Messages.notFound });
    }
    return Response(res)(null, { menus });
  } catch (error) {
    console.log(error);
    return Response(res)(error, null);
  }
};



//Show
exports.show = async (req, res) => {
  try {
    let menu = await Menus.getMenuById(req.params.id);
    if (!menu) {
      return Response(res)({ message: Messages.notFound }, null);
    }
    return Response(res)(null, { menu });
  } catch (error) {
    console.log(error);
    return Response(res)(error, null);
  }
};

//Create
exports.create = async (req, res) => {
  try {
    const menus = await Menus.create(req.body);

    if(!menus){
      return Response(res.status(200))({ 
        message: Messages.notExists
      }, null)
    }

    return Response(res)(null, { menus });
  } catch (error) {
    if (error.message.split(" ").indexOf("Duplicate") !== -1) {
      return Response(res)(null, { message: Messages.duplicateEntry });
    }
    return Response(res)(error, null);
  }
};

//Update
exports.update = async (req, res) => {
  try {
    const menus = await Menus.update(req.params.id, req.body);

    if (!menus) {
      return Response(res)(null, { message: Messages.notExists });
    }
    
    return Response(res)(null, { message: Messages.updated });
  } catch (error) {
    return Response(res)(error, null);
  }
};

//Delete
exports.delete = async (req, res) => {
  try {
    const menus = await Menus.delete(req.params.id);
    if (!menus) {
      return Response(res)(null, { message: Messages.notExists });
    }
    return Response(res)(null, { message: Messages.deleted });
  } catch (error) {
    return Response(res)(error, null);
  }
};

exports.position = async (req, res) => {
  try {    
    const menu = await Menus.changePosition(req.body)

    if(menu === "positionError"){
      return Response(res.status(200))({
        message: Messages.outOfPosition
      }, null)
    }

    if(!menu){
      return Response(res.status(200))({
        message: Messages.notExists
      }, null)
    }

    return Response(res)(null, {
      message: Messages.updated
    })    
  } catch (error) {
    console.log(error)
    return Response(res)(error, null)
  } 
}