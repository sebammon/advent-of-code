use std::collections::HashSet;
use std::fs;

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap();

    let priority = input
        .lines()
        .map(|line| {
            let middle = line.len() / 2;

            let first_compartment: HashSet<char> = HashSet::from_iter(line[..middle].chars());
            let second_compartment: HashSet<char> = HashSet::from_iter(line[middle..].chars());

            return first_compartment
                .intersection(&second_compartment)
                .collect::<String>();
        })
        .map(|row| {
            let item = row.as_bytes()[0];

            if item >= b'a' {
                (item - b'a' + 1) as u32
            } else {
                (item - b'A' + 27) as u32
            }
        })
        .sum::<u32>();

    println!("Part one: {}", priority);
}
