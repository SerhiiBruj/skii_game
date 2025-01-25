use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use wee_alloc::WeeAlloc;
use rand::Rng;
use js_sys::{Array, Object, Reflect};  
use serde::{Serialize, Deserialize};
// Використовуємо WeeAlloc для оптимізації пам'яті
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;


#[wasm_bindgen]
pub struct Game {
    player_x: f64,
    player_y: f64,
    acceleration: f64,
    rotation:i8,
    width:f64,
    height:f64,
    traces: Vec<(f64, f64)>,

    game_over: bool,

    tree_spawn_per_chunk:u8,
    trees_chunk1: Vec<(f64, f64)>,
    trees_chunk2: Vec<(f64, f64)>,
    trees_chunk3: Vec<(f64, f64)>,
    current_chunk:u8,
}


#[wasm_bindgen]
impl Game {
    pub fn new(height: f64, width: f64, tree_spawn_per_chunk: u8) -> Game {
        Game {
            player_x: width / 2.0,
            player_y: 0.0,
            acceleration: 0.0,
            rotation: 0,
            width,
            height,
            traces: vec![],
            trees_chunk1: vec![],
            trees_chunk2: vec![],
            trees_chunk3: vec![],
            current_chunk:1,
            game_over: false,
            tree_spawn_per_chunk,
        }
    }

    pub fn restart(&mut self){
        self.player_x= self.width / 2.0;
        self.player_y= 0.0;
        self.acceleration = 0.0;
        self.trees_chunk1= vec![];
        self.trees_chunk2= vec![];
        self.trees_chunk3= vec![];
        self.current_chunk=1;
        self.game_over= false;
        self.rotation=0;
    }



    pub fn generate_chunk(&mut self, num_of_current_chunk : u8) {
        let mut chunk_trees = Vec::new(); 
        let y_start = ((num_of_current_chunk + 1) as f64) * self.height;
        let y_end = y_start + self.height as f64;
    
        self.traces.retain(|trace| trace.1 < self.player_y - 200.0);
    
        // Генеруємо дерева в межах поточного чанка
        for _ in 0..self.tree_spawn_per_chunk {
            let x = rand::random::<f64>() * self.width as f64; 
            let y = rand::random::<f64>() * (y_end - y_start) + y_start; 
            chunk_trees.push((x, y)); 
        }
    
        // Додаємо дерева для меж
        for _ in 0..3 {
            let x_left = rand::random::<f64>() * 30.0; 
            let y_left = rand::random::<f64>() * (y_end - y_start) + y_start; 
            chunk_trees.push((x_left, y_left));
        
            let x_right = self.width - 30.0 + rand::random::<f64>() * 30.0; 
            let y_right = rand::random::<f64>() * (y_end - y_start) + y_start; 
            chunk_trees.push((x_right, y_right)); 
        }
    
        // Оновлюємо відповідний чанк
        match num_of_current_chunk {
            0 => self.trees_chunk1 = chunk_trees,
            1 => self.trees_chunk2 = chunk_trees,
            2 => self.trees_chunk3 = chunk_trees,
            _ => {}
        }
    }


    pub fn change_player_rotation(&mut self, rotation_degree: i8) {
        self.rotation = rotation_degree;
        self.acceleration = (90 - self.rotation.abs()) as f64 ;
    }

    pub fn btn_change_rotation(&mut self, amount: i8) {
        let new_rotation = self.rotation + amount;
        if new_rotation >= -70 && new_rotation <= 70 {
            self.rotation = new_rotation; 
            self.acceleration = (90 - self.rotation.abs()) as f64; 
        }
    }
    
    fn move_player(&mut self) {
        self.acceleration *= 1.001;
        self.player_y += (self.acceleration as f64)/15.0;
        self.player_x += (self.rotation  as f64)/10 as f64;
        self.game_over = self.check_collision();
    }
    


    fn get_all_trees(&self) -> Vec<(f64, f64)> {
        let mut all_trees = Vec::new();
        
        all_trees.extend_from_slice(&self.trees_chunk1);
        all_trees.extend_from_slice(&self.trees_chunk2);
        all_trees.extend_from_slice(&self.trees_chunk3);

        all_trees
    }

    
    pub fn update(&mut self) {
        let num_of_current_chunk = (self.player_y /self.height) as u8; 
        let cur_chunk_being_rendered =num_of_current_chunk%3 +1;
        if self.current_chunk != cur_chunk_being_rendered {
            self.generate_chunk(num_of_current_chunk); 
            self.current_chunk = cur_chunk_being_rendered;
        }

        self.traces.push((self.player_x, self.player_y));
        self.move_player();
    }


    pub fn get_all_trees_for_js(&self) -> JsValue {
        let all_trees = Array::new();
    
        // Додаємо дерева з chunk1, якщо поточний чанк 2 або 3
        if self.current_chunk == 1 || self.current_chunk == 3 {
            for tree in &self.trees_chunk1 {
                let tree_obj = Object::new();
                Reflect::set(&tree_obj, &"x".into(), &JsValue::from_f64(tree.0)).unwrap();
                Reflect::set(&tree_obj, &"y".into(), &JsValue::from_f64(tree.1)).unwrap();
                all_trees.push(&tree_obj);
            }
        }
        // Додаємо дерева з chunk2, якщо поточний чанк 1 або 2
        if self.current_chunk == 2 || self.current_chunk == 1 {
            for tree in &self.trees_chunk2 {
                let tree_obj = Object::new();
                Reflect::set(&tree_obj, &"x".into(), &JsValue::from_f64(tree.0)).unwrap();
                Reflect::set(&tree_obj, &"y".into(), &JsValue::from_f64(tree.1)).unwrap();
                all_trees.push(&tree_obj);
            }
        }
        // Додаємо дерева з chunk3, якщо поточний чанк 2 або 3
        if self.current_chunk == 3 || self.current_chunk == 2 {
            for tree in &self.trees_chunk3 {
                let tree_obj = Object::new();
                Reflect::set(&tree_obj, &"x".into(), &JsValue::from_f64(tree.0)).unwrap();
                Reflect::set(&tree_obj, &"y".into(), &JsValue::from_f64(tree.1)).unwrap();
                all_trees.push(&tree_obj);
            }
        }
    
        all_trees.into()
    }

    


    pub fn get_all_traces_for_js(&self) -> JsValue {
        let all_traces = Array::new();

        // Фільтруємо сліди за умовою
        for trace in &self.traces {
            if trace.1 >= self.player_y - self.height * 0.2 {
                let trace_obj = Object::new();
                Reflect::set(&trace_obj, &"x".into(), &JsValue::from_f64(trace.0)).unwrap();
                Reflect::set(&trace_obj, &"y".into(), &JsValue::from_f64(trace.1)).unwrap();
                all_traces.push(&trace_obj);
            }
        }

        all_traces.into()
    }



    pub fn check_collision(&self) -> bool {
        let trees = self.get_all_trees();
        if self.player_x > self.width|| self.player_x < 0.0 {
            return true;
        }
        for tree in trees {
            let distance = ((self.player_x - tree.0).powi(2) + (self.player_y - tree.1).powi(2)).sqrt();
            let player_radius =10.0;
            let tree_radius = 10.0;
            if distance < player_radius + tree_radius {
                return true; 
            }
        }
        false
    }


    pub fn get_is_game_over(&self) -> bool {
        self.game_over
    }

    
    pub fn get_player_x(&self) -> f64 {
        self.player_x
    }
    pub fn get_player_y(&self) -> f64 {
        self.player_y
    }
    pub fn get_player_rotation(&self) -> i8 {
        self.rotation
    }
    pub fn get_current_chunk(&self) -> u8 {
        self.current_chunk
    }

}