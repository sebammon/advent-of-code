use std::collections::HashSet;
use std::fs;

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap();

    let priorities_sum = &input
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

    println!("Part one: {}", priorities_sum);

    let lines = &input.lines().collect::<Vec<&str>>();

    let mut priorities_sum = 0;
    for i in (0..lines.len()).step_by(3) {
        let first: HashSet<char> = HashSet::from_iter(lines[i].chars());
        let second: HashSet<char> = HashSet::from_iter(lines[i + 1].chars());
        let third: HashSet<char> = HashSet::from_iter(lines[i + 2].chars());

        let first_and_second: HashSet<char> =
            HashSet::from_iter(first.intersection(&second).cloned());

        let first_second_third = first_and_second.intersection(&third);
        let item = first_second_third.collect::<String>().as_bytes()[0];

        if item >= b'a' {
            priorities_sum += (item - b'a' + 1) as u32
        } else {
            priorities_sum += (item - b'A' + 27) as u32
        }
    }

    println!("Part two: {}", priorities_sum);
}
