function permute(nums) {
    const results = []; // Almacena todas las permutaciones
    const used = new Array(nums.length).fill(false); // Rastrea los números utilizados
    
    function backtrack(temp) {
      if (temp.length === nums.length) {
        results.push([...temp]); // Copia la permutación actual
        return;
      }
  
      for (let i = 0; i < nums.length; i++) {
        if (used[i]) continue; // Saltar números ya usados
        
        temp.push(nums[i]); // Agregar el número actual a la combinación
        used[i] = true; // Marcarlo como usado
        
        backtrack(temp); // Llamada recursiva
  
        // Backtracking: revertir el estado
        temp.pop();
        used[i] = false;
      }
    }
    
    backtrack([]); 
    return results;
  }
  
  console.log(permute([1, 2, 3]));
  