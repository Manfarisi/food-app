import foodModel from '../models/foodModel.js'
import fs from 'fs'

const addFood = async(req,res)=>{

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        image:image_filename
    })

    try {
        await food.save()
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// all food list
const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
// remove food item
const removeFood = async(req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// edit food
const editFood = async (req, res) => {
    try {
        const { id, name, price, description, category } = req.body;

        // Cek apakah makanan dengan ID yang diberikan ada di database
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Jika ada gambar baru, hapus gambar lama dan gunakan gambar baru
        let image_filename = food.image; // Default tetap gambar lama
        if (req.file) {
            fs.unlink(`uploads/${food.image}`, () => {}); // Hapus gambar lama
            image_filename = req.file.filename; // Gunakan gambar baru
        }

        // Update data makanan
        food.name = name || food.name;
        food.price = price || food.price;
        food.description = description || food.description;
        food.category = category || food.category;
        food.image = image_filename;

        await food.save();
        res.json({ success: true, message: "Food updated successfully", data: food });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating food" });
    }
};

const editIdFood = async (req, res) => {
    try {
        const { id } = req.params || req.body; // Ambil ID dari params atau body

        // Cari data berdasarkan ID
        const foods = await foodModel.findById(id);
        if (!foods) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        let image_filename = foods.image; // Default tetap gambar lama
        if (req.file) {
            fs.unlink(`uploads/${foods.image}`, () => {}); // Hapus gambar lama
            image_filename = req.file.filename; // Gunakan gambar baru
        }
        
        foods.image = image_filename;

        // Simpan perubahan
        await foods.save();

        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

export {addFood,listFood,removeFood,editFood,editIdFood}