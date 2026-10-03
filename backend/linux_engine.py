def run_command(command):
    command = command.strip()

    if command == "pwd":
        return "/home/student"

    return f"Command not found: {command}"