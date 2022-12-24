use std::fs;

fn part_1(input: &String) -> u32 {
    return input.lines().fold(0 as u32, |count, line| {
        let (first_range, second_range) = line
            .split_once(',')
            .map(|(a, b)| (a.split_once('-').unwrap(), b.split_once('-').unwrap()))
            .unwrap();

        let first_min: u32 = first_range.0.parse().unwrap();
        let first_max: u32 = first_range.1.parse().unwrap();
        let second_min: u32 = second_range.0.parse().unwrap();
        let second_max: u32 = second_range.1.parse().unwrap();

        if first_min >= second_min && first_max <= second_max
            || first_min <= second_min && first_max >= second_max
        {
            count + 1
        } else {
            count
        }
    });
}

fn part_2(input: &String) -> u32 {
    return input.lines().fold(0 as u32, |count, line| {
        let (first_range, second_range) = line
            .split_once(',')
            .map(|(a, b)| (a.split_once('-').unwrap(), b.split_once('-').unwrap()))
            .unwrap();

        let first_min: u32 = first_range.0.parse().unwrap();
        let first_max: u32 = first_range.1.parse().unwrap();
        let second_min: u32 = second_range.0.parse().unwrap();
        let second_max: u32 = second_range.1.parse().unwrap();

        if first_min <= second_min && second_min <= first_max
            || first_min <= second_max && second_max <= first_max
            || second_min <= first_max && first_max <= second_max
            || second_min <= first_min && first_min <= second_max
        {
            count + 1
        } else {
            count
        }
    });
}

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap();

    let fully_overlap_count = part_1(&input);

    println!("Part 1 {}", fully_overlap_count);

    let overlap_count = part_2(&input);

    println!("Part 2 {}", overlap_count);
}
