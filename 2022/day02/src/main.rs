use std::fs;

fn main() {
    let data = fs::read_to_string("./input.txt").unwrap();

    // Part 1
    let part_1_score = data.lines().fold(0, |acc, line| {
        let result = match line {
            "A X" => 1 + 3, // Rock Rock
            "B X" => 1 + 0, // Paper Rock
            "C X" => 1 + 6, // Scissors Rock
            "A Y" => 2 + 6, // Rock Paper
            "B Y" => 2 + 3, // Paper Paper
            "C Y" => 2 + 0, // Scissors Paper
            "A Z" => 3 + 0, // Rock Scissors
            "B Z" => 3 + 6, // Paper Scissors
            "C Z" => 3 + 3, // Scissors Scissors
            _ => panic!(),
        };

        acc + result
    });

    println!("Part 1 score: {}", part_1_score);

    let part_2_score = data.lines().fold(0, |acc, line| {
        let result = match line {
            "A X" => 0 + 3, // Rock
            "B X" => 0 + 1, // Paper
            "C X" => 0 + 2, // Scissors
            "A Y" => 3 + 1, // Rock
            "B Y" => 3 + 2, // Paper
            "C Y" => 3 + 3, // Scissors
            "A Z" => 6 + 2, // Rock
            "B Z" => 6 + 3, // Paper
            "C Z" => 6 + 1, // Scissors
            _ => panic!(),
        };

        acc + result
    });

    println!("Part 2 score: {}", part_2_score);
}
