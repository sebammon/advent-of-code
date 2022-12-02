use std::fs;

fn main() {
    let data = fs::read_to_string("./input.txt").unwrap();

    let mut elf_calories: Vec<i32> = data
        .trim()
        .split("\n\n")
        .map(|items| {
            items
                .trim()
                .split("\n")
                .fold(0, |acc, x| acc + x.parse::<i32>().unwrap())
        })
        .collect();

    elf_calories.sort();

    // Could also just take the last element but what would be the fun in learning all the methods
    let max_calories = elf_calories.iter().max().unwrap();

    let top_three = elf_calories[elf_calories.len() - 3..]
        .iter()
        .fold(0, |acc, curr| acc + curr);

    println!("Part one (max): {}", max_calories);
    println!("Part two (top three max): {:?}", top_three)
}
